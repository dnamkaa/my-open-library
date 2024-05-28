import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      await axios.post('http://localhost:5000/upload', formData);
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
