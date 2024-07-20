// src/components/FlipbookReader.js
import React, { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

const FlipbookReader = ({ filename }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`http://localhost:5000/pdf-to-images/${filename}`);
      const urls = await response.json();
      setImageUrls(urls);
    };

    fetchImages();
  }, [filename]);

  return (
    <div className="flip-book">
      {imageUrls.length > 0 && (
        <HTMLFlipBook width={800} height={600}>
          {imageUrls.map((url, index) => (
            <div className="page" key={index}>
              <img src={url} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default FlipbookReader;
