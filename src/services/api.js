export const fetchEbooks = async () => {
  try {
    const response = await fetch('http://localhost:5000/ebooks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching eBooks:', error);
    throw error;
  }
};


export const fetchClassicBooks = async () => {
  try {
    const response = await fetch('https://openlibrary.org/subjects/classics.json?limit=10');
    return await response.json();
  } catch (error) {
    console.error('Error fetching classic books:', error);
    throw error;
  }
};

export const fetchBookDetails = async (bookId) => {
  try {
    const response = await fetch(`https://openlibrary.org/works/${bookId}.json`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};



export const fetchBookContent = async (bookId) => {
  try {
    const response = await fetch(`http://localhost:5000/ebooks/${bookId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching book content:', error);
    throw error;
  }
};
// services/api.js

export const fetchOpenLibraryBooks = async () => {
  try {
    const response = await fetch('https://openlibrary.org/subjects/classics.json?limit=10');
    const data = await response.json();
    return data.works;
  } catch (error) {
    console.error('Error fetching Open Library books:', error);
    throw error;
  }
};
