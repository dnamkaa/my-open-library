// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchBooks } from '../services/api';
import '../styles/BookList.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const query = useQuery().get('q');
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      if (query) {
        const books = await fetchBooks(query);
        console.log('Search results:', books); // Log search results
        setBooks(books);
      }
    };
    getBooks();
  }, [query]);

  return (
    <div className="book-list-container">
      <h1>Book List</h1>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.key} className="book-item">
            <Link to={`/book/${book.key}`}>
              <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150'} alt={book.title} />
              <p>{book.title}</p>
              <p>{book.author_name && book.author_name.join(', ')}</p>
            </Link>
            <button className="btn btn-primary" onClick={() => navigate(`/read/${book.key}`)}>Read</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
