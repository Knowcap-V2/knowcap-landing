
import { GoogleGenAI, Type } from "@google/genai";
import { Source, ChatMessage, Speaker, KnownSpeaker } from "../types";

// Helper to get AI instance
const getAI = () => new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

// Helper for delays
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Safely parse JSON that might be wrapped in Markdown or truncated
const safeParseJSON = (text: string) => {
  try {
    // 1. Strip Markdown code blocks if present
    let cleanText = text.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
    
    // 2. Try parsing
    return JSON.parse(cleanText);
  } catch (e) {
    console.warn("JSON parse failed, attempting manual extraction...", e);
    
    // 3. Fallback: Manual Regex Extraction for truncated/malformed JSON
    // This salvages the Summary and Transcription even if the JSON is broken at the end
    try {
        const summaryMatch = text.match(/"summary":\s*"([^"]*)/);
        // summary often is short and likely complete
        const summary = summaryMatch ? summaryMatch[1] : "Summary unavailable (Analysis interrupted)";

        // Transcription is usually the largest part and most likely to be truncated
        // We try to grab everything after "transcription": " until the end or the next quote
        const transMatch = text.match(/"transcription":\s*"([\s\S]*)/);
        let transcription = transMatch ? transMatch[1] : "";
        
        // If it ends with ", it might be closed. If not, it's truncated.
        // We strip the last quote if it exists to be clean, or just use what we have.
        if (transcription.endsWith('"}')) {
             transcription = transcription.slice(0, -2);
        } else if (transcription.endsWith('"')) {
             transcription = transcription.slice(0, -1);
        }

        // Speakers are hard to regex if truncated, return empty array to be safe
        // The UI will just show "Unknown" in transcript, which is fine
        return {
            summary,
            transcription,
            speakers: []
        };
    } catch (extractError) {
        throw new Error("Failed to parse AI response: " + (e as Error).message);
    }
  }
};

// RETRY WRAPPER: Handles 503 (Overloaded) and 429 (Rate Limit) errors
const generateContentWithRetry = async (ai: GoogleGenAI, params: any, retries = 3): Promise<any> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (error: any) {
      const isOverloaded = error.message?.includes('503') || error.message?.includes('overloaded');
      const isRateLimit = error.message?.includes('429');
      
      if ((isOverloaded || isRateLimit) && attempt < retries - 1) {
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000; // Exponential backoff + jitter
        console.warn(`Gemini overloaded. Retrying in ${delay.toFixed(0)}ms... (Attempt ${attempt + 1}/${retries})`);
        await wait(delay);
        continue;
      }
      throw error;
    }
  }
};

// Helper to sanitize MIME types
const cleanMimeType = (mimeType: string) => {
  if (!mimeType) return 'application/pdf'; 
  const lower = mimeType.split(';')[0].toLowerCase().trim();
  
  if (lower.includes('matroska')) return 'video/webm';
  if (lower.includes('quicktime')) return 'video/mp4'; 
  if (lower.includes('mov')) return 'video/mp4'; 
  if (lower.includes('x-m4v')) return 'video/mp4';
  if (lower.includes('audio/x-m4a')) return 'audio/m4a';
  if (lower.includes('pdf')) return 'application/pdf';
  
  return lower;
};

// Helper: Convert Base64 to Blob safely
const base64ToBlob = (base64Data: string, mimeType: string) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];
  const sliceSize = 1024;

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
};

// Helper: Blob to Base64 (raw)
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Helper: Upload File via Gemini File API
const uploadFileToGemini = async (input: string | Blob, mimeType: string, onProgress?: (status: string) => void, abortSignal?: AbortSignal) => {
  const ai = getAI();
  const cleanMime = cleanMimeType(mimeType);
  
  let blob: Blob;
  if (typeof input === 'string') {
    blob = base64ToBlob(input, cleanMime);
  } else {
    blob = input;
  }
  
  if (abortSignal?.aborted) throw new Error("Aborted");

  const sizeMB = (blob.size / 1024 / 1024).toFixed(2);
  console.log(`Uploading file to Gemini... Size: ${sizeMB}MB, Type: ${cleanMime}`);
  if (onProgress) onProgress(`Uploading large file (${sizeMB}MB) to Gemini servers...`);

  const uploadResult = await ai.files.upload({
    file: blob,
    config: { mimeType: cleanMime }
  });

  if (abortSignal?.aborted) throw new Error("Aborted");

  const file = (uploadResult as any).file || uploadResult;
  if (!file || !file.uri) {
     throw new Error("Upload to Gemini failed: No URI returned.");
  }

  const fileUri = file.uri;
  const fileName = file.name;

  console.log(`Upload successful. URI: ${fileUri}`);
  if (onProgress) onProgress("File uploaded. Waiting for AI processing...");

  let fileState = file.state;
  while (fileState === 'PROCESSING') {
     if (abortSignal?.aborted) throw new Error("Aborted");
     await new Promise(resolve => setTimeout(resolve, 2000));
     
     const fileStatus = await ai.files.get({ name: fileName });
     fileState = fileStatus.state;
     if (onProgress) onProgress(`Processing video on server: ${fileState}...`);
     
     if (fileState === 'FAILED') {
        throw new Error("Video processing failed on Gemini servers.");
     }
  }

  return fileUri;
};

export const analyzeDocument = async (
  input: string | Blob,
  mimeType: string,
  onProgress?: (status: string) => void,
  abortSignal?: AbortSignal
): Promise<{ summary: string; transcription: string }> => {
  const ai = getAI();
  const cleanMime = cleanMimeType(mimeType);
  
  let contentPart: any;
  const size = typeof input === 'string' ? input.length : input.size;
  const isLargeFile = size > 18000000;

  if (isLargeFile) {
     const fileUri = await uploadFileToGemini(input, mimeType, onProgress, abortSignal);
     contentPart = { fileData: { fileUri: fileUri, mimeType: cleanMime } };
  } else {
     if (onProgress) onProgress("Initializing document analysis...");
     let dataStr = "";
     if (typeof input === 'string') dataStr = input;
     else dataStr = await blobToBase64(input);
     contentPart = { inlineData: { mimeType: cleanMime, data: dataStr } };
  }

  if (onProgress) onProgress("Analyzing document content...");

  const prompt = `
    Analyze this document.
    1. Provide a concise summary.
    2. Extract the full text content accurately.
    
    Return JSON:
    {
      "summary": "...",
      "transcription": "..."
    }
  `;

  const response = await generateContentWithRetry(ai, {
    model: 'gemini-2.5-flash',
    contents: { parts: [contentPart, { text: prompt }] },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          transcription: { type: Type.STRING },
        },
        required: ["summary", "transcription"]
      }
    }
  });

  if (response.text) {
    return safeParseJSON(response.text);
  }
  throw new Error("Failed to analyze document");
};

export const analyzeAudio = async (
  input: string | Blob, 
  mimeType: string, 
  knownSpeakers: KnownSpeaker[] = [],
  onProgress?: (status: string) => void,
  abortSignal?: AbortSignal
): Promise<{ summary: string; speakers: { id: string, label: string, voiceProfile: string }[]; transcription: string }> => {
  const ai = getAI();
  const cleanMime = cleanMimeType(mimeType);
  
  let contentPart: any;
  const size = typeof input === 'string' ? input.length : input.size;
  const isLargeFile = size > 18000000;

  if (isLargeFile) {
     const fileUri = await uploadFileToGemini(input, mimeType, onProgress, abortSignal);
     contentPart = { fileData: { fileUri: fileUri, mimeType: cleanMime } };
  } else {
     if (onProgress) onProgress("Initializing analysis...");
     let dataStr = "";
     if (typeof input === 'string') {
        dataStr = input;
     } else {
        dataStr = await blobToBase64(input);
     }
     contentPart = { inlineData: { mimeType: cleanMime, data: dataStr } };
  }

  if (abortSignal?.aborted) throw new Error("Aborted");
  if (onProgress) onProgress("Generating transcript and identifying speakers...");

  let speakerContextInstructions = "";
  if (knownSpeakers.length > 0) {
    speakerContextInstructions = `
      STEP: SPEAKER MATCHING
      KNOWN SPEAKERS: ${JSON.stringify(knownSpeakers.map(s => ({ name: s.name, profile: s.voiceProfile })))}
      - Compare generated voice profiles to KNOWN SPEAKERS.
      - If plausible match, use their name as 'label'.
    `;
  }

  const prompt = `
    Analyze audio.
    Step 1: Speaker Diarization (IDs: SPEAKER_01...)
    Step 2: Voice Profiling (Gender, Pitch, Pace, Accent)
    - IMPORTANT: Do NOT use voice descriptions (e.g. "Male Low Pitch") as the 'label' or ID.
    - If a speaker matches a KNOWN SPEAKER, use their NAME as the label.
    - If NO MATCH found, use generic "Speaker 1", "Speaker 2", etc.
    Step 3: Transcription. 
    - CRITICAL: Chunk text by COMPLETE THOUGHTS or PARAGRAPHS. Do not break sentences mid-way or by arbitrary time limits.
    - Start each chunk with a timestamp [MM:SS] representing the start of that complete thought.
    - Format: [MM:SS] SPEAKER_01: Full sentences of the thought...
    Step 4: Summary.
    ${speakerContextInstructions}

    Return JSON:
    {
      "summary": "...",
      "transcription": "...",
      "speakers": [{ "id": "...", "label": "...", "voiceProfile": "..." }]
    }
  `;

  const response = await generateContentWithRetry(ai, {
    model: 'gemini-2.5-flash',
    contents: { parts: [contentPart, { text: prompt }] },
    config: {
      temperature: 0.1,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          transcription: { type: Type.STRING },
          speakers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { id: { type: Type.STRING }, label: { type: Type.STRING }, voiceProfile: { type: Type.STRING } },
              required: ["id", "label", "voiceProfile"]
            }
          }
        },
        required: ["summary", "transcription", "speakers"]
      }
    }
  });

  if (response.text) return safeParseJSON(response.text);
  throw new Error("Failed to analyze audio");
};

export const analyzeScreenRecording = async (
  input: string | Blob, 
  mimeType: string, 
  knownSpeakers: KnownSpeaker[] = [],
  onProgress?: (status: string) => void,
  abortSignal?: AbortSignal
): Promise<{ summary: string; speakers: { id: string, label: string, voiceProfile: string }[]; transcription: string }> => {
  const ai = getAI();
  const cleanMime = cleanMimeType(mimeType);

  let contentPart: any;
  const size = typeof input === 'string' ? input.length : input.size;
  const isLargeFile = size > 18000000;

  if (isLargeFile) {
     const fileUri = await uploadFileToGemini(input, mimeType, onProgress, abortSignal);
     contentPart = { fileData: { fileUri: fileUri, mimeType: cleanMime } };
  } else {
     if (onProgress) onProgress("Initializing analysis...");
     let dataStr = "";
     if (typeof input === 'string') {
        dataStr = input;
     } else {
        dataStr = await blobToBase64(input);
     }
     contentPart = { inlineData: { mimeType: cleanMime, data: dataStr } };
  }

  if (abortSignal?.aborted) throw new Error("Aborted");
  if (onProgress) onProgress("Analyzing video content and visual actions...");

  let speakerContextInstructions = "";
  if (knownSpeakers.length > 0) {
    speakerContextInstructions = `
      STEP: SPEAKER MATCHING
      KNOWN SPEAKERS: ${JSON.stringify(knownSpeakers.map(s => ({ name: s.name, profile: s.voiceProfile })))}
      If match, use name as 'label'.
    `;
  }

  // Optimized Prompt: Focused on key events to save tokens
  const prompt = `
    Analyze screen recording.
    Step 1: Audio Analysis (Transcribe, Diarize).
    ${speakerContextInstructions}
    Step 2: Significant Visual Analysis.
    - Log ONLY major screen changes (e.g. "User clicks 'Settings'"). Ignore mouse idles.
    Step 3: Integrated Timeline.
    - Chunk text by "Complete Thoughts".
    - Start each chunk with [MM:SS].
    - INTEGRATE VISUALS: Append [ACTION]: descriptions *inside* the audio text chunk.
    - Format: [MM:SS] SPEAKER_01: Text... [ACTION]: Visual description.
    Step 4: Summary.

    Return JSON:
    {
      "summary": "...",
      "transcription": "...",
      "speakers": [{ "id": "...", "label": "...", "voiceProfile": "..." }]
    }
  `;

  const response = await generateContentWithRetry(ai, {
    model: 'gemini-2.5-flash',
    contents: { parts: [contentPart, { text: prompt }] },
    config: {
      temperature: 0.1,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          transcription: { type: Type.STRING },
          speakers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: { id: { type: Type.STRING }, label: { type: Type.STRING }, voiceProfile: { type: Type.STRING } },
              required: ["id", "label", "voiceProfile"]
            }
          }
        },
        required: ["summary", "transcription", "speakers"]
      }
    }
  });

  if (response.text) return safeParseJSON(response.text);
  throw new Error("Failed to analyze screen recording");
};

export const chatWithNotebook = async (
  history: ChatMessage[], 
  sources: Source[], 
  userMessage: string
): Promise<string> => {
  const ai = getAI();
  const context = sources.map(s => `SOURCE: ${s.title}\nTYPE: ${s.type}\nCONTENT: ${s.content}`).join('\n\n');

  const systemInstruction = `
    You are a helpful AI assistant. Answer based ONLY on sources.
    CITATIONS: When referencing info, include timestamp [MM:SS].
    SOURCES: ${context}
  `;

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: { systemInstruction }
  });

  for (const msg of history) {
    if (msg.role === 'user') {
      await chat.sendMessage({ message: msg.text });
    }
  }

  const result = await chat.sendMessage({ message: userMessage });
  return result.text || "I couldn't generate a response.";
};
