import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="searchbar flex gap-2">
      <input
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onKeyDown={(e)=>{ if(e.key === 'Enter') handleSearch(); }}
        placeholder="Search anime (e.g. naruto)"
        className="p-2 rounded text-black flex-1"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Search
      </button>
    </div>
  );
}
