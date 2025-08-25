import React from 'react';

export default function VideoPlayer({ src }) {
  if (!src) {
    return (
      <div className="text-center text-gray-400 p-4 border rounded-lg bg-gray-900">
        No playable source available
      </div>
    );
  }

  // Detect if it's an embed/iframe link instead of a direct video file
  const isEmbed =
    typeof src === 'string' &&
    (src.includes('embed') || src.includes('iframe') || src.endsWith('.html'));

  return (
    <div className="w-full max-w-5xl mx-auto aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
      {isEmbed ? (
        <iframe
          key={src}
          src={src}
          title="Anime Player"
          allowFullScreen
          className="w-full h-full border-0"
        />
      ) : (
        <video
          key={src} // ensures reload when switching sources
          src={src}
          controls
          autoPlay
          className="w-full h-full object-contain bg-black"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
