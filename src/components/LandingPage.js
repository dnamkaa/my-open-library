import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import Section from './Section';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/LandingPage.css';
import axios from 'axios';

const LandingPage = () => {
  const [query, setQuery] = useState('');
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [classicBooks, setClassicBooks] = useState([]);
  const [recentlyReturnedBooks, setRecentlyReturnedBooks] = useState([]);
  const [localEbooks, setLocalEbooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getBooks = useCallback(async () => {
    try {
      const [trending, classic, recentlyReturned] = await Promise.all([
        fetchBooks('trending'),
        fetchBooks('classic'),
        fetchBooks('recently-returned')
      ]);

      const localEbooksResponse = await axios.get('http://localhost:5000/ebooks');

      setTrendingBooks(trending);
      setClassicBooks(classic);
      setRecentlyReturnedBooks(recentlyReturned);
      setLocalEbooks(localEbooksResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Section title="Trending Books" books={trendingBooks} navigate={navigate} />
              <Section title="Classic Books" books={classicBooks} navigate={navigate} />
              <Section title="Recently Returned" books={recentlyReturnedBooks} navigate={navigate} />
              <Section title="Local eBooks" books={localEbooks} navigate={navigate} isLocal />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
