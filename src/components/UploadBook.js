// src/components/LandingPage.js
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import '../styles/LandingPage.css';

const Section = lazy(() => import('./Section'));

const LandingPage = () => {
  const [query, setQuery] = useState('');
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [classicBooks, setClassicBooks] = useState([]);
  const [recentlyReturnedBooks, setRecentlyReturnedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      const trending = await fetchBooks('trending');
      const classic = await fetchBooks('classic');
      const recentlyReturned = await fetchBooks('recently-returned');

      console.log('Trending Books:', trending);
      console.log('Classic Books:', classic);
      console.log('Recently Returned Books:', recentlyReturned);

      setTrendingBooks(trending);
      setClassicBooks(classic);
      setRecentlyReturnedBooks(recentlyReturned);
    };
    getBooks();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <img src="/path/to/logo.png" alt="Open Library Logo" className="logo" />
          <h1 className="title">Welcome to Open Library</h1>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary search-button">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <Section title="Trending Books" books={trendingBooks} navigate={navigate} />
            <Section title="Classic Books" books={classicBooks} navigate={navigate} />
            <Section title="Recently Returned" books={recentlyReturnedBooks} navigate={navigate} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
