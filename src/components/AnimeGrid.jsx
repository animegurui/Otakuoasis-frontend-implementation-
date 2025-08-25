import React from 'react';
import { Link } from 'react-router-dom';

export default function AnimeGrid({ title, animeList }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {animeList.map(anime => (
          <li key={anime._id} className="bg-gray-800 p-3 rounded-lg">
            <Link to={`/anime/${anime.source || 'gogoanime'}/${anime.slug}`}>
              <img
                src={anime.image || 'https://via.placeholder.com/200x300'}
                alt={anime.title}
                className="rounded-md mb-2"
              />
              <p className="font-semibold">{anime.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
