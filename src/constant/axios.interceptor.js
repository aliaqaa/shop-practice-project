import Cookies from 'js-cookie';

import axios from 'axios';  

// Create an Axios instance with default configuration  
const api = axios.create({  
  baseURL: 'https://api.escuelajs.co/api', // Replace with your API's base URL (e.g., 'https://api.example.com')  
  timeout: 10000, // Optional: Set a default timeout (in milliseconds)  
  headers: {  
    'Content-Type': 'application/json',  
    // You can add other default headers here, like an API key  
  },  
});  

// Request interceptor:  Add authorization headers, modify the request, etc.  
api.interceptors.request.use(  
  (config) => {  
    // Get the token from wherever you store it (e.g., localStorage, Redux)  
    const token = Cookies.get('token'); // Example: Get token from localStorage  

    if (token) {  
      config.headers.Authorization = `Bearer ${token}`;  
    }  

    // You can also add other request modifications here, like logging  
    console.log('Request intercepted:', config);  
    return config;  
  },  
  (error) => {  
    // Handle request errors (e.g., invalid configuration)  
    console.error('Request error:', error);  
    return Promise.reject(error);  
  }  
);  

// Response interceptor:  Handle successful responses, error responses, refresh tokens, etc.  
api.interceptors.response.use(  
  (response) => {  
    // Any status code that falls within the range of 2xx cause this function to trigger  
    // You can modify the response data here (e.g., extract only the data you need)  
    console.log('Response intercepted:', response);  
    return response; // Or return response.data if you only need the data  
  },  
  (error) => {  
    // Any status codes that falls outside the range of 2xx cause this function to trigger  
    // Handle response errors (e.g., unauthorized, server error)  

    console.error('Response error:', error);  

    if (error.response && error.response.status === 401) {  
      // Example: Unauthorized - Redirect to login or refresh token  
      console.log('Unauthorized: Redirecting to login');  
      // window.location.href = '/login'; // Redirect to login page (if using browser routing)  

      // Alternatively, try to refresh the token (if you have a refresh token mechanism)  
      // return refreshToken().then(newToken => {  
      //   error.config.headers.Authorization = `Bearer ${newToken}`;  
      //   return api.request(error.config); // Retry the original request with the new token  
      // }).catch(refreshError => {  
      //   // Handle refresh token failure (e.g., redirect to login)  
      //   console.error('Refresh token failed:', refreshError);  
      //   window.location.href = '/login';  
      //   return Promise.reject(refreshError);  
      // });  
    }  

    return Promise.reject(error);  // Re-throw the error so the calling component can handle it  
  }  
);  

export default api;  