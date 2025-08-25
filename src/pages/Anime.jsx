import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEpisodes } from "../api/animeAPI"; // ✅ fixed import
import EpisodeList from '../components/EpisodeList';

export default function Anime() {
  const { source, slug } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadEpisodes();
  }, [source, slug]);

  async function loadEpisodes() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchEpisodes(source, slug);

      // Normalize different possible API responses
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.episodes)
        ? data.episodes
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.gogo)
        ? data.gogo
        : [];

      setEpisodes(list || []);
    } catch (err) {
      console.error('Failed to load episodes', err);
      setError('Failed to load episodes.');
    } finally {
      setLoading(false);
    }
  }

  function onPlay(epNum) {
    navigate(`/watch/${source}/${slug}/${epNum}`);
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">
        {decodeURIComponent(slug).replace(/-/g, ' ')}
      </h1>

      {loading && <p>Loading episodes…</p>}
      {error && <p className="text-red-400">{error}</p>}
      {!loading && !error && (
        <EpisodeList episodes={episodes} onPlay={onPlay} />
      )}
    </div>
  );
}
