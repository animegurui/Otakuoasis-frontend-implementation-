import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import AnimeGrid from '../components/AnimeGrid';
import { fetchTrending } from '../api';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState(null); // null means “not searching yet”
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [errorTrending, setErrorTrending] = useState('');

  useEffect(() => {
    const loadTrending = async () => {
      setLoadingTrending(true);
      setErrorTrending('');
      try {
        const data = await fetchTrending();
        // backend might return an array or an object—normalize to array
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : Array.isArray(data?.gogo)
          ? data.gogo
          : Array.isArray(data?.db)
          ? data.db
          : [];
        setTrending(list);
      } catch (e) {
        console.error(e);
        setErrorTrending('Failed to load trending.');
      } finally {
        setLoadingTrending(false);
      }
    };
    loadTrending();
  }, []);

  const handleSearchResults = (payload) => {
    // `/anime/search` currently returns `{ gogo: [...] }` on your backend.
    // If you later change it to a plain array, this normalization still works.
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.gogo)
      ? payload.gogo
      : Array.isArray(payload?.results)
      ? payload.results
      : [];
    setSearchResults(list);
  };

  const showingSearch = searchResults && searchResults.length > 0;

  return (
    <div className="p-4 text-white">
      <div className="mb-4">
        <SearchBar onResults={handleSearchResults} />
      </div>

      {showingSearch ? (
        <>
          <h2 className="text-xl font-semibold mb-3">Search Results</h2>
          <AnimeGrid items={searchResults} emptyText="No matches found" />
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-3">Trending</h2>
          {loadingTrending && <p>Loading trending…</p>}
          {errorTrending && <p className="text-red-400">{errorTrending}</p>}
          {!loadingTrending && !errorTrending && (
            <AnimeGrid items={trending} emptyText="No trending found" />
          )}
        </>
      )}
    </div>
  );
}
