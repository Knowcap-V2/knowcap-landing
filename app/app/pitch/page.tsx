'use client'

export default function PitchPage() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      margin: 0, 
      padding: 0, 
      overflow: 'hidden' 
    }}>
      <iframe
        src="/pitch-deck.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="Knowcap Pitch Deck"
      />
    </div>
  )
}
