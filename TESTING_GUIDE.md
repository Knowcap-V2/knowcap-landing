# Knowapp Testing & Debugging Guide

## What I've Done

### 1. **Code Analysis** ✅
Compared your original zip file with the deployed code:
- All components are **100% functionally identical**
- Only difference: API key environment variable (correctly adapted for Next.js)
- All buttons, handlers, and logic are present

### 2. **Enhanced Debug Logging** ✅
Added comprehensive console logging to track every step:
- File upload initialization
- Blob URL creation
- IndexedDB saves
- Status transitions (processing → analyzing → completed)
- Gemini API calls and responses
- Error messages with full stack traces

### 3. **How the App Should Work**

#### Expected Flow:
```
1. User uploads audio/video file
   ↓
2. App creates source with status='processing' at 1%
   ↓
3. Blob URL created immediately (allows instant playback)
   ↓
4. File saved to IndexedDB (background)
   ↓
5. Status transitions to 'analyzing'
   ↓
6. Gemini API called for transcription
   ↓
7. Status transitions to 'completed' at 100%
   ↓
8. Eye button appears ✅
   Play button appears ✅
   X button disappears ✅
```

#### Button Visibility Logic:
- **Eye Button** 👁️: Shows when status is NOT 'processing' (for viewing transcript)
- **Play Button** ▶️: Shows when status is NOT 'processing' AND file type is audio/video
- **X Button** ❌: Shows when status IS 'processing' (to cancel upload)

## How to Test & Debug

### Step 1: Open the App
1. Go to **https://knowcap.ai/app**
2. Open browser DevTools (F12 or right-click → Inspect)
3. Go to **Console** tab
4. Keep console open during testing

### Step 2: Upload a Test File
1. Click on any notebook (or create a new one)
2. Click "Add Sources" button
3. Upload an audio or video file
4. **Watch the console** for debug messages

### Step 3: What to Look For

#### ✅ Expected Console Messages:
```
[Knowapp] handleUploadFiles called with 1 file(s)
[Knowapp] Processing file: test.mp3 (audio/mpeg) -> type: audio, size: 524288 bytes
[Knowapp] Created blob URL for test.mp3: blob:https://knowcap.ai/...
[Knowapp] Created source object for <uuid>
[Knowapp] Updating UI with 1 new source(s)
[Knowapp] Saving test.mp3 to IndexedDB
[Knowapp] Successfully saved test.mp3 to IndexedDB
[Knowapp] Starting AI analysis for test.mp3
[Knowapp] Starting background processing for source <uuid>
[Knowapp] Transitioning source <uuid> to 'analyzing' status
[Knowapp] Processing file with mimeType: audio/mpeg
[Knowapp] Calling analyzeAudio for <uuid>
[Knowapp] Progress status for <uuid>: Initializing...
[Knowapp] Progress update for <uuid>: 15%
... (more progress updates)
[Knowapp] Analysis completed successfully for <uuid>
[Knowapp] Setting source <uuid> to 'completed' status
[Knowapp] Cleanup completed for <uuid>
```

#### ❌ Error Patterns to Watch For:

**Error 1: API Key Issues**
```
[Gemini API] API key not configured
[Gemini API] Invalid API key
[Gemini API] 401 Unauthorized
```
**Solution**: Check if API key is valid at https://aistudio.google.com/app/apikey

**Error 2: Rate Limiting**
```
[Gemini API] Rate limit exceeded
[Gemini API] 429 Too Many Requests
```
**Solution**: Wait a few minutes before retrying

**Error 3: File Size Issues**
```
[Gemini API] File too large
[Knowapp] Analysis returned null/undefined
```
**Solution**: Try a smaller file (< 10MB)

**Error 4: IndexedDB Issues**
```
[Knowapp] Background processing failed: QuotaExceededError
DOMException: The quota has been exceeded
```
**Solution**: Clear browser storage (Settings → Privacy → Clear browsing data)

### Step 4: Test Button Functionality

#### While File is Processing:
- ❌ **X Button** should be visible and clickable
- Click it → Source should be removed from list
- Console should show: `[Knowapp] Processing aborted for <uuid>`

#### After File Completes:
- 👁️ **Eye Button** should appear
- Click it → Should open source detail view with transcript
- ▶️ **Play Button** should appear (for audio/video)
- Click it → Audio/video should play using blob URL

### Step 5: Check Common Issues

#### Issue 1: File Stuck at "Uploading 1%"
**What to Check:**
1. Console errors related to Gemini API
2. Network tab → Check if API request failed
3. Try a different file (smaller size)
4. Check if status ever transitions to 'analyzing'

**Console Command to Check Status:**
```javascript
// Paste this in console to see current source statuses
const notebooks = JSON.parse(localStorage.getItem('notebookLM_notebooks') || '[]');
notebooks.forEach(nb => {
  console.log('Notebook:', nb.title);
  nb.sources?.forEach(s => {
    console.log(`  - ${s.title}: ${s.processingStatus} (${s.processingProgress}%)`);
  });
});
```

#### Issue 2: Eye Button Never Appears
**Diagnosis:**
Source is stuck in 'processing' or 'analyzing' status

**Fix:**
1. Check console for errors during analysis
2. Try refreshing the page (reloads sources from localStorage)
3. Check if Gemini API is working

#### Issue 3: X Button Doesn't Work
**Diagnosis:**
Abort controller not being triggered or source not being removed

**Check Console For:**
```
[Knowapp] Processing aborted for <uuid>
```

If you don't see this message, the cancel handler isn't being called.

### Step 6: Clear Test Data

If you need to start fresh:

**Clear All Notebooks:**
```javascript
// Paste in console
localStorage.removeItem('notebookLM_notebooks');
localStorage.removeItem('notebookLM_knownSpeakers');
console.log('Cleared all notebooks');
location.reload();
```

**Clear IndexedDB:**
1. Open DevTools → Application tab
2. Left sidebar → IndexedDB → NotebookReplicaMediaDB
3. Right-click → Delete database
4. Refresh page

## Quick Diagnosis Checklist

- [ ] Console shows `[Knowapp]` debug messages
- [ ] File upload creates source with blob URL
- [ ] Blob URL is visible in console
- [ ] Status transitions from 'processing' → 'analyzing'
- [ ] Gemini API is called successfully
- [ ] Status transitions to 'completed'
- [ ] Eye button appears after completion
- [ ] Play button works with audio/video
- [ ] X button removes source during processing
- [ ] No errors in console during process

## What to Report Back

### If Eye Button Doesn't Appear:
1. Screenshot of console messages
2. What file type/size you uploaded
3. What status the source is stuck at
4. Any error messages in console

### If X Button Doesn't Work:
1. Screenshot of console when clicking X
2. Whether source gets removed from UI
3. Any error messages

### If Everything Works:
🎉 Let me know! The debug logs can be removed.

## Additional Notes

### Why Blob URLs?
The app creates blob URLs immediately so you can:
- Play audio/video without waiting for processing
- Preview media before transcription completes
- This is separate from the AI analysis

### Why Two-Phase Processing?
1. **Phase 1 (Instant)**: Show file in UI, create blob URL
2. **Phase 2 (Background)**: Save to IndexedDB, call Gemini API

This provides instant feedback while processing happens behind the scenes.

### Storage Locations:
- **Notebooks metadata**: `localStorage` (key: `notebookLM_notebooks`)
- **Media files**: IndexedDB (database: `NotebookReplicaMediaDB`)
- **Known speakers**: `localStorage` (key: `notebookLM_knownSpeakers`)

## Need More Help?

If the issue persists after following this guide:
1. Share console screenshots
2. Specify exact steps that fail
3. Include any error messages
4. Mention file type and size you're testing with

The enhanced debug logging will help us pinpoint exactly where the process breaks down!
