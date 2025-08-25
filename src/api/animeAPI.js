import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

export const fetchTrending = () => api.get('/anime/trending').then(r => r.data);
export const searchAnime = (q) => api.get(`/anime/search?q=${encodeURIComponent(q)}`).then(r => r.data);
export const fetchEpisodes = (source, slug) => api.get(`/anime/episodes/${encodeURIComponent(source)}/${encodeURIComponent(slug)}`).then(r => r.data);
export const fetchEpisodeSources = (source, slug, episode) => api.get(`/anime/episode-sources/${encodeURIComponent(source)}/${encodeURIComponent(slug)}/${encodeURIComponent(episode)}`).then(r => r.data);
