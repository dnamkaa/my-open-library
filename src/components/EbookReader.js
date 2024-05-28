import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import '../styles/EbookReader.css';

const EbookReader = ({ filename }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/uploads/${encodeURIComponent(filename)}`);
        const blob = await response.blob();
        const fileUrl = URL.createObjectURL(blob);
        setFileUrl(fileUrl);
      } catch (error) {
        console.error('Error fetching book content:', error);
      }
    };

    if (filename) {
      fetchBookContent();
    }
  }, [filename]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="ebook-reader">
      <h1>Reading Book</h1>
      {fileUrl && (
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      )}
      {numPages && (
        <div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
            Previous
          </button>
          <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EbookReader;
