import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchAnime } from '../api/animeAPI';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const q = query.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    searchAnime(q)
      .then(setResults)
      .finally(() => setLoading(false));
  }, [q]);

  if (!q) return <p className="text-center mt-8">Type something to search.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Results for "{q}"</h1>
      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(anime => (
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
