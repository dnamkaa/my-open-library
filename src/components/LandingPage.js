// src/components/LandingPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEbooks, fetchOpenLibraryBooks } from '../services/api';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [localBooks, setLocalBooks] = useState([]);
  const [openLibraryBooks, setOpenLibraryBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch local books
        const localBooksData = await fetchEbooks();
        setLocalBooks(localBooksData);

        // Fetch Open Library books
        const openLibraryBooksData = await fetchOpenLibraryBooks();
        setOpenLibraryBooks(openLibraryBooksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleReadClick = (bookId, filename, externalUrl) => {
    if (externalUrl) {
      navigate('/external-read', { state: { iframeSrc: externalUrl } });
    } else if (filename) {
      navigate(`/local-read/${filename}`, { state: { iframeSrc: `/path/to/local/books/${filename}` } });
    } else {
      navigate(`/read/${bookId}`, { state: { iframeSrc: `/path/to/online/books/${bookId}` } });
    }
  };

  return (
    <div className="landing-page">
     
      <section className="book-section">
        <h2>Local Books</h2>
        <div className="book-list">
          {localBooks.map((book) => (
            <div key={book.id} className="book-item">
              <img src={book.cover_url} alt={book.title} />
              <p>{book.title}</p>
              <button onClick={() => handleReadClick(book.id, book.filename, null)}>Read</button>
            </div>
          ))}
        </div>
      </section>
      <section className="book-section">
        <h2>Open Library Books</h2>
        <div className="book-list">
          {openLibraryBooks.map((book) => (
            <div key={book.key} className="book-item">
              <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} />
              <p>{book.title}</p>
              <button onClick={() => handleReadClick(book.key, null, `https://openlibrary.org${book.key}`)}>Read</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
