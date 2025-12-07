
export interface Speaker {
  id: string; // e.g., "SPEAKER_01"
  label: string; // e.g., "Speaker A"
  name: string; // User assigned name
  color: string;
  voiceProfile?: string; // AI generated description of voice characteristics
}

export interface KnownSpeaker {
  name: string;
  voiceProfile: string;
}

export type ProcessingStatus = 'processing' | 'analyzing' | 'transcribing' | 'completed' | 'failed';

export interface Source {
  id: string;
  title: string;
  type: 'audio' | 'text' | 'video' | 'pdf';
  content: string; // Full content for chat context
  transcription?: string; // Structured transcription for UI display
  audioData?: string; // Base64 string for playback
  videoData?: string; // Base64 string for video playback
  createdAt: number;
  speakers?: Speaker[];
  originalFileName?: string;
  
  // Background Processing State
  processingStatus?: ProcessingStatus;
  processingProgress?: number; // 0-100
  processingError?: string;
}

export interface Notebook {
  id: string;
  title: string;
  coverColor: string;
  sources: Source[];
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
