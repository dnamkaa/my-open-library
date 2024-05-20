// src/components/BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookDetails } from '../services/api';
import '../styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const getBookDetails = async () => {
      const book = await fetchBookDetails(id);
      setBook(book);
    };
    getBookDetails();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <Link to={`/read/${id}`}>Read Book</Link>
    </div>
  );
};

export default BookDetails;
