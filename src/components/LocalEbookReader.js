// src/components/LocalEbookReader.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../styles/EbookReader.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const LocalEbookReader = () => {
  const { filename } = useParams();
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

  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

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
        <div className="pagination-controls">
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
            Previous
          </button>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalEbookReader;
