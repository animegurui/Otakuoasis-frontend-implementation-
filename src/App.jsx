import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Anime from './pages/Anime';
import Watch from './pages/Watch';
import SearchResults from './pages/SearchResults'; // ✅ add this

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: 18 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:source/:slug" element={<Anime />} />
          <Route path="/watch/:source/:slug/:episode" element={<Watch />} />
          <Route path="/search" element={<SearchResults />} /> {/* ✅ new */}
        </Routes>
      </main>
    </div>
  );
}
