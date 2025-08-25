import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEpisodeSources, fetchEpisodes } from '../api/animeAPI';
import VideoPlayer from '../components/VideoPlayer';

export default function Watch() {
  const { source, slug, episode } = useParams();
  const [sources, setSources] = useState([]);
  const [current, setCurrent] = useState(null);
  const [epsList, setEpsList] = useState([]);
  const [loadingSources, setLoadingSources] = useState(false);
  const [errorSources, setErrorSources] = useState('');
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [errorEpisodes, setErrorEpisodes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadEpisodes();
    loadSources();
    // eslint-disable-next-line
  }, [source, slug, episode]);

  async function loadEpisodes() {
    setLoadingEpisodes(true);
    setErrorEpisodes('');
    try {
      const data = await fetchEpisodes(source, slug);
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.episodes)
        ? data.episodes
        : Array.isArray(data?.data)
        ? data.data
        : [];
      setEpsList(list || []);
    } catch (err) {
      console.error(err);
      setErrorEpisodes('Failed to load episodes.');
    } finally {
      setLoadingEpisodes(false);
    }
  }

  async function loadSources() {
    setLoadingSources(true);
    setErrorSources('');
    try {
      const data = await fetchEpisodeSources(source, slug, episode);
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.sources)
        ? data.sources
        : Array.isArray(data?.videoSources)
        ? data.videoSources
        : [];

      const normalized = (list || [])
        .map((s) => {
          if (typeof s === 'string')
            return { url: s, quality: 'default', type: detectType(s) };
          return {
            url: s.url || s.file || s.link || s.file_url,
            quality: s.quality || s.server || 'source',
            type: detectType(s.url || s.file || s.link || s.file_url),
          };
        })
        .filter(Boolean);

      setSources(normalized);
      if (normalized.length) setCurrent(normalized[0]);
    } catch (err) {
      console.error('sources', err);
      setErrorSources('Failed to load sources.');
    } finally {
      setLoadingSources(false);
    }
  }

  function detectType(url) {
    if (!url) return 'unknown';
    if (url.includes('embed') || url.includes('iframe')) return 'iframe';
    if (url.endsWith('.mp4') || url.endsWith('.mkv') || url.endsWith('.webm'))
      return 'video';
    if (url.endsWith('.m3u8')) return 'hls';
    return 'video';
  }

  function prevEp() {
    const n = Number(episode) - 1;
    if (n >= 1) navigate(`/watch/${source}/${slug}/${n}`);
  }
  function nextEp() {
    const n = Number(episode) + 1;
    navigate(`/watch/${source}/${slug}/${n}`);
  }

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-semibold mb-4">
        {decodeURIComponent(slug).replace(/-/g, ' ')} — Episode {episode}
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          {current ? (
            <VideoPlayer src={current.url} type={current.type} />
          ) : (
            <p className="text-gray-400">No video selected</p>
          )}

          <div className="mt-3 flex gap-2">
            <button
              onClick={prevEp}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              ⬅ Prev
            </button>
            <button
              onClick={nextEp}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              Next ➡
            </button>
          </div>
        </div>

        <aside className="w-full md:w-64 bg-gray-800 p-3 rounded">
          <h3 className="font-semibold mb-2">Sources</h3>
          {loadingSources && <p className="text-gray-400">Loading sources…</p>}
          {errorSources && <p className="text-red-400">{errorSources}</p>}
          {!loadingSources && !errorSources && sources.length === 0 && (
            <p className="text-gray-400">No sources</p>
          )}
          {sources.map((s, i) => (
            <div key={i} className="mb-1">
              <button
                onClick={() => setCurrent(s)}
                className="w-full px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 text-left"
              >
                {s.quality} ({s.type})
              </button>
            </div>
          ))}

          <h3 className="font-semibold mt-4 mb-2">Episodes</h3>
          {loadingEpisodes && <p className="text-gray-400">Loading episodes…</p>}
          {errorEpisodes && <p className="text-red-400">{errorEpisodes}</p>}
          {!loadingEpisodes && !errorEpisodes && (
            <div className="grid grid-cols-3 gap-2">
              {epsList.map((epObj, idx) => {
                const num = epObj.number ?? epObj.episode ?? idx + 1;
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      navigate(`/watch/${source}/${slug}/${num}`)
                    }
                    className={`px-2 py-1 rounded ${
                      Number(episode) === num
                        ? 'bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
