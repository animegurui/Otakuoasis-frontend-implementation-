import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">⚡ OtakuOasis</Link>
        <nav>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="navlink">GitHub</a>
        </nav>
      </div>
    </header>
  );
}
