import axios from 'axios';

const initializeApp = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

  if (!import.meta.env.MODE || import.meta.env.MODE === 'development') {
    // Dev code
  } else {
    // Prod code
    console.log = () => {};
    // init analytics here
  }
};

export default initializeApp;
