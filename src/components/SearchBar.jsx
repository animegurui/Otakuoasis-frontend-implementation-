import React, { useState } from 'react';

export default function SearchBar({ onSearch }){
  const [q, setQ] = useState('');
  return (
    <div className="searchbar">
      <input
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onKeyDown={(e)=>{ if(e.key === 'Enter') onSearch(q); }}
        placeholder="Search anime (e.g. naruto)"
      />
      <button onClick={() => onSearch(q)}>Search</button>
    </div>
  );
}
