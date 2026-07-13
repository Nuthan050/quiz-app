import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="container">
        <h1 className="app-title">QuizMaster</h1>
        <nav className="app-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/create" className="nav-link">
            Create Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;