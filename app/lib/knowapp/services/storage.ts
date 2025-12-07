
import { Notebook, Source, KnownSpeaker } from '../types';
import { saveMediaToDB, getMediaFromDB } from './db';

const STORAGE_KEY = 'notebook_lm_replica_data_v1';
const KNOWN_SPEAKERS_KEY = 'notebook_lm_replica_known_speakers_v1';

const defaultNotebooks: Notebook[] = [
  {
    id: '1',
    title: 'Advisory and Fundraising Strategy',
    coverColor: 'bg-yellow-100',
    updatedAt: Date.now(),
    sources: []
  },
  {
    id: '2',
    title: 'Product Launch Notes',
    coverColor: 'bg-blue-100',
    updatedAt: Date.now() - 100000,
    sources: []
  }
];

// Robust UUID generator with fallback
const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // Fallback
    }
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const loadNotebooks = (): Notebook[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return defaultNotebooks;
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultNotebooks;
  }
};

/**
 * Saves notebooks metadata to LocalStorage and offloads heavy media to IndexedDB.
 */
export const saveNotebooks = async (notebooks: Notebook[]) => {
  // 1. Save heavy media data to IndexedDB first
  const savePromises: Promise<void>[] = [];
  
  for (const nb of notebooks) {
    for (const s of nb.sources) {
      // If audioData exists and it's not the placeholder ref, save it
      if (s.audioData && s.audioData !== 'DB_REF' && !s.audioData.startsWith('blob:http')) {
         // Note: We skip blob URLs (blob:http...) because they are temporary. 
         // Real data should have been saved to DB during upload/recording.
         // However, if we have base64 string or Blob object in memory, save it.
         savePromises.push(saveMediaToDB(s.id, s.audioData));
      }
      // If videoData exists...
      if (s.videoData && s.videoData !== 'DB_REF' && !s.videoData.startsWith('blob:http')) {
        savePromises.push(saveMediaToDB(s.id, s.videoData));
      }
    }
  }
  
  await Promise.all(savePromises);

  // 2. Create "lean" notebooks for LocalStorage (replace data with 'DB_REF')
  const leanNotebooks = notebooks.map(nb => ({
    ...nb,
    sources: nb.sources.map(s => ({
      ...s,
      audioData: s.audioData ? 'DB_REF' : undefined,
      videoData: s.videoData ? 'DB_REF' : undefined
    }))
  }));

  try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leanNotebooks));
  } catch (e) {
      console.error("LocalStorage quota exceeded even with lean notebooks", e);
      throw e; 
  }
};

export const createNotebook = (title: string): Notebook => {
  const colors = ['bg-red-100', 'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return {
    id: generateId(),
    title,
    coverColor: randomColor,
    updatedAt: Date.now(),
    sources: []
  };
};

export const getKnownSpeakers = (): KnownSpeaker[] => {
  const data = localStorage.getItem(KNOWN_SPEAKERS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveKnownSpeaker = (speaker: KnownSpeaker) => {
  if (!speaker || !speaker.name) return;
  const speakers = getKnownSpeakers();
  // Defensive check for s.name in case of bad data in storage
  const index = speakers.findIndex(s => (s.name || "").toLowerCase() === speaker.name.toLowerCase());
  if (index >= 0) {
    speakers[index] = speaker;
  } else {
    speakers.push(speaker);
  }
  localStorage.setItem(KNOWN_SPEAKERS_KEY, JSON.stringify(speakers));
};

/**
 * Loads full media content for a notebook from IndexedDB.
 */
export const hydrateNotebook = async (notebook: Notebook): Promise<Notebook> => {
  // Deep clone to avoid mutating the original reference immediately
  const deepCopy = JSON.parse(JSON.stringify(notebook));
  
  await Promise.all(deepCopy.sources.map(async (s: Source) => {
    if ((s.type === 'audio' || s.type === 'video' || s.type === 'pdf') && (s.audioData === 'DB_REF' || s.videoData === 'DB_REF')) {
       const data = await getMediaFromDB(s.id);
       if (data) {
         let mediaUrl: string;
         if (data instanceof Blob) {
            mediaUrl = URL.createObjectURL(data);
         } else {
            // Backwards compatibility for Base64 strings
            const type = s.type === 'video' ? 'video/webm' : 'audio/webm';
            mediaUrl = data.startsWith('data:') ? data : `data:${type};base64,${data}`;
         }

         if (s.type === 'audio' || s.audioData === 'DB_REF') s.audioData = mediaUrl;
         if (s.type === 'video' || s.type === 'pdf' || s.videoData === 'DB_REF') s.videoData = mediaUrl;
       }
    }
  }));
  
  return deepCopy;
};
