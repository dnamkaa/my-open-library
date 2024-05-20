// src/services/api.js
import axios from 'axios';

const API_URL = 'https://openlibrary.org';

export const fetchBooks = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search.json?q=${query}`);
    console.log('API response:', response.data); // Log the API response
    return response.data.docs.map(book => ({
      key: book.key,
      title: book.title,
      cover_i: book.cover_i,
      author_name: book.author_name,
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export const fetchBookDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/works/${id}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
  }
};

export const fetchBookContent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/works/${id}.json`);
    return response.data.content; // Adjust based on actual API response structure
  } catch (error) {
    console.error('Error fetching book content:', error);
  }
};
