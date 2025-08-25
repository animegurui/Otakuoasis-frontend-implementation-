import React from 'react';

export default function VideoPlayer({ src }){
  if (!src) return <div className="muted">No playable source</div>;
  return (
    <video controls autoPlay className="video-player">
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
}
