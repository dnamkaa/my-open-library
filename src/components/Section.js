
// src/components/Section.js
import React from 'react';
import Slider from 'react-slick';
import '../styles/Section.css';

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
                book.cover_id
                  ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
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

export default Section;
