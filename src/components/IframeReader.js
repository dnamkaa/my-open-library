import React from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Import useNavigate
import '../styles/IframeReader.css';

const IframeReader = () => {
  const { filename, bookId, externalUrl } = useParams();
  const location = useLocation();
  const iframeSrc = location.state?.iframeSrc || '';


  return (
    <div className="iframe-reader">
      
      <iframe src={iframeSrc} title="Book Reader" width="100%" height="100%" frameBorder="0"></iframe>
    </div>
  );
};

export default IframeReader;
