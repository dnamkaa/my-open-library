import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchBooks } from '../services/api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/LandingPage.css';

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
          <Section title="Trending Books" books={trendingBooks} navigate={navigate} />
          <Section title="Classic Books" books={classicBooks} navigate={navigate} />
          <Section title="Recently Returned" books={recentlyReturnedBooks} navigate={navigate} />
        </div>
      </main>
    </div>
  );
};

const Section = ({ title, books, navigate }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="book-section">
      <h2>{title}</h2>
      <Slider {...settings}>
        {books.map((book) => (
          <div className="book-item" key={book.key}>
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : 'https://via.placeholder.com/150'
              }
              alt={book.title}
            />
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/read/${book.key}`)}
            >
              {title === 'Trending Books' ? 'Preview Only' : 'Read'}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LandingPage;
