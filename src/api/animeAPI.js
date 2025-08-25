import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'https://animegurui-otakuoasis.onrender.com';

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

// ✅ Get trending anime
export const fetchTrending = () => 
  api.get('/anime/trending').then(r => r.data);

// ✅ Search anime
export const searchAnime = (q) => 
  api.get(`/anime/search?q=${encodeURIComponent(q)}`).then(r => r.data);

// ✅ Get episodes by anime ID
export const fetchEpisodes = (animeId) => 
  api.get(`/anime/episodes/${encodeURIComponent(animeId)}`).then(r => r.data);

// ✅ Get episode streaming sources
export const fetchEpisodeSources = (animeId, episode) => 
  api.get(`/anime/stream/${encodeURIComponent(animeId)}/${encodeURIComponent(episode)}`).then(r => r.data);
