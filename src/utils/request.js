import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://viral-nation-so1v.onrender.com',
});

// Function to set the JWT token to the request headers
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Add request interceptor
api.interceptors.request.use(
  async function (config) {
    // Get the token from storage or wherever you store it
    const token = await AsyncStorage.getItem('user');
    const userToken = JSON.parse(token)?.token;

    // Set the JWT token to the request headers
    setAuthToken(userToken);

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  function (response) {
    // Handle successful responses
    return response;
  },
  function (error) {
    // Log the complete response object
    console.log('Complete Response:', error.response);

    // Handle the error as needed
    if (error.response) {
      // Response received with non-2xx status code
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else if (error.request) {
      // Request made, but no response received
      console.log('Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.log('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
