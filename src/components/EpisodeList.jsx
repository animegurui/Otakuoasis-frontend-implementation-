import React from 'react';

export default function EpisodeList({ episodes = [], onPlay }){
  return (
    <div className="episode-list">
      {episodes.map((ep, i) => {
        const num = ep.number ?? ep.episode ?? (i+1);
        return (
          <div key={i} className="ep-item">
            <div>Episode {num}</div>
            <button onClick={() => onPlay(num)}>Play</button>
          </div>
        );
      })}
    </div>
  );
}
