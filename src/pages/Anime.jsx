import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEpisodes } from '../api/animeAPI';
import EpisodeList from '../components/EpisodeList';

export default function Anime(){
  const { source, slug } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    loadEpisodes();
  }, [source, slug]);

  async function loadEpisodes(){
    try {
      const data = await fetchEpisodes(source, slug);
      const list = Array.isArray(data) ? data : (data.episodes || data.data || []);
      setEpisodes(list || []);
    } catch (err){
      console.error('episodes', err);
    }
  }

  function onPlay(epNum){
    navigate(`/watch/${source}/${slug}/${epNum}`);
  }

  return (
    <div>
      <h1>{decodeURIComponent(slug).replace(/-/g,' ')}</h1>
      <EpisodeList episodes={episodes} onPlay={onPlay} />
    </div>
  );
}
