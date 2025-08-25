import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEpisodeSources, fetchEpisodes } from '../api/animeAPI';
import VideoPlayer from '../components/VideoPlayer';

export default function Watch(){
  const { source, slug, episode } = useParams();
  const [sources, setSources] = useState([]);
  const [current, setCurrent] = useState(null);
  const [epsList, setEpsList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=> {
    loadEpisodes();
    loadSources();
    // eslint-disable-next-line
  }, [source, slug, episode]);

  async function loadEpisodes(){
    try {
      const data = await fetchEpisodes(source, slug);
      const list = Array.isArray(data) ? data : (data.episodes || data.data || []);
      setEpsList(list || []);
    } catch (err){ console.error(err); }
  }

  async function loadSources(){
    try {
      const data = await fetchEpisodeSources(source, slug, episode);
      // Normalize
      const list = Array.isArray(data) ? data : (data.sources || data.videoSources || []);
      // If items are objects with url/file properties, map to { url, quality }
      const normalized = (list || []).map(s => {
        if (typeof s === 'string') return { url: s, quality: 'default' };
        return { url: s.url || s.file || s.link || s.file_url, quality: s.quality || s.server || 'source' };
      }).filter(Boolean);
      setSources(normalized);
      if (normalized.length) setCurrent(normalized[0].url);
    } catch (err){ console.error('sources', err); }
  }

  function prevEp(){
    const n = Number(episode) - 1;
    if (n >= 1) navigate(`/watch/${source}/${slug}/${n}`);
  }
  function nextEp(){
    const n = Number(episode) + 1;
    navigate(`/watch/${source}/${slug}/${n}`);
  }

  return (
    <div>
      <h2>{decodeURIComponent(slug).replace(/-/g,' ')} — Episode {episode}</h2>

      <div className="watch-grid">
        <div>
          <VideoPlayer src={current} />
          <div style={{ marginTop: 8 }}>
            <button onClick={prevEp}>⬅ Prev</button>
            <button onClick={nextEp} style={{ marginLeft: 8 }}>Next ➡</button>
          </div>
        </div>

        <aside style={{ marginLeft: 16, minWidth: 220 }}>
          <h3>Sources</h3>
          {sources.length === 0 ? <div className="muted">No sources</div> : sources.map((s,i)=>(<div key={i}><button onClick={()=>setCurrent(s.url)}>{s.quality}</button></div>))}
          <h3 style={{ marginTop: 12 }}>Episodes</h3>
          <div className="episode-list">
            {epsList.map((epObj, idx) => {
              const num = epObj.number ?? epObj.episode ?? (idx+1);
              return <div key={idx} className="ep-item"><a href={`/watch/${source}/${slug}/${num}`}>Ep {num}</a></div>;
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
