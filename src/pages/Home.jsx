import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import AnimeGrid from '../components/AnimeGrid';
import { fetchTrending, searchAnime } from '../api/animeAPI.jsx';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState(null); // null means “not searching yet”
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [errorTrending, setErrorTrending] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState('');

  // Load trending anime on page load
  useEffect(() => {
    const loadTrending = async () => {
      setLoadingTrending(true);
      setErrorTrending('');
      try {
        const data = await fetchTrending();
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

  // Handle search input from SearchBar
  const handleSearch = async (q) => {
    if (!q) {
      setSearchResults(null); // reset to trending if query is empty
      return;
    }

    setLoadingSearch(true);
    setErrorSearch('');
    try {
      const data = await searchAnime(q);
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.gogo)
        ? data.gogo
        : Array.isArray(data?.results)
        ? data.results
        : [];
      setSearchResults(list);
    } catch (e) {
      console.error(e);
      setErrorSearch('Search failed.');
    } finally {
      setLoadingSearch(false);
    }
  };

  const showingSearch = searchResults && searchResults.length > 0;

  return (
    <div className="p-4 text-white">
      <div className="mb-4">
        {/* Pass onSearch instead of onResults so it matches SearchBar.jsx */}
        <SearchBar onSearch={handleSearch} />
      </div>

      {showingSearch ? (
        <>
          <h2 className="text-xl font-semibold mb-3">Search Results</h2>
          {loadingSearch && <p>Searching…</p>}
          {errorSearch && <p className="text-red-400">{errorSearch}</p>}
          {!loadingSearch && !errorSearch && (
            <AnimeGrid items={searchResults} emptyText="No matches found" />
          )}
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
