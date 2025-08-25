import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AnimeCard({ anime, source = 'gogoanime' }){
  const navigate = useNavigate();
  const slug = anime.slug || anime.animeId || encodeURIComponent((anime.title || '').toLowerCase().replace(/\s+/g,'-'));
  const image = anime.image || anime.poster || '/img-placeholder.png';
  return (
    <div className="card" onClick={() => navigate(`/anime/${source}/${slug}`)}>
      <img src={image} alt={anime.title} />
      <div className="card-title">{anime.title}</div>
    </div>
  );
}
