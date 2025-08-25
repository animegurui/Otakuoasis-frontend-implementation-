import React, { useEffect, useState } from 'react';
import { fetchTrending, searchAnime } from '../api/animeAPI';
import AnimeCard from '../components/AnimeCard';
import SearchBar from '../components/SearchBar';

export default function Home(){
  const [trending, setTrending] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(()=> {
    loadTrending();
  }, []);

  async function loadTrending(){
    try {
      const data = await fetchTrending();
      // data might be an array or an object from different sources — normalize to array
      const list = Array.isArray(data) ? data : (data.data || data);
      setTrending(list || []);
    } catch (err){
      console.error('trending', err);
    }
  }

  async function doSearch(q){
    if(!q) return;
    try {
      const data = await searchAnime(q);
      // anigo may return object with provider keys — flatten heuristically
      let items = [];
      if (Array.isArray(data)) items = data;
      else {
        for (const k of Object.keys(data)) {
          if (Array.isArray(data[k])) items = items.concat(data[k]);
        }
      }
      setResults(items);
    } catch (err){
      console.error('search', err);
    }
  }

  return (
    <div>
      <SearchBar onSearch={doSearch} />
      {results.length > 0 ? (
        <>
          <h2>Search Results</h2>
          <div className="grid">
            {results.map((a,i)=>(<AnimeCard key={i} anime={a} />))}
          </div>
        </>
      ) : (
        <>
          <h2>Trending</h2>
          <div className="grid">
            {trending.length ? trending.map((a,i)=>(<AnimeCard key={i} anime={a} />)) : <div className="muted">No trending found</div>}
          </div>
        </>
      )}
    </div>
  );
}
