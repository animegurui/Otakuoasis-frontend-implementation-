import React, { useState } from 'react';
import { searchAnime } from '../api'; // adjust path if api.js is elsewhere

export default function SearchBar({ onResults }) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!q.trim()) return;
    setLoading(true);
    setError('');
    try {
      const results = await searchAnime(q);
      onResults(results); // send search results back to parent
    } catch (err) {
      setError('Failed to fetch anime. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="searchbar flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
        placeholder="Search anime (e.g. Naruto)"
        className="p-2 rounded border border-gray-500 text-black"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="text-red-500 ml-2">{error}</p>}
    </div>
  );
}
