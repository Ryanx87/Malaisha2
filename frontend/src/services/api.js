import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  getCurrentUser: () => api.get('/auth/me'),
};

// User API endpoints
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteAccount: () => api.delete('/users/account'),
};

// Job API endpoints
export const jobAPI = {
  getJobs: (params) => api.get('/jobs', { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post('/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  applyToJob: (id, applicationData) => api.post(`/jobs/${id}/apply`, applicationData),
  getApplications: () => api.get('/jobs/applications'),
};

// Message API endpoints
export const messageAPI = {
  getConversations: () => api.get('/messages/conversations'),
  getMessages: (conversationId) => api.get(`/messages/${conversationId}`),
  sendMessage: (conversationId, message) => api.post(`/messages/${conversationId}`, message),
  markAsRead: (conversationId) => api.put(`/messages/${conversationId}/read`),
};

// Payment API endpoints
export const paymentAPI = {
  createPaymentIntent: (amount, jobId) => api.post('/payments/create-intent', { amount, jobId }),
  confirmPayment: (paymentIntentId) => api.post('/payments/confirm', { paymentIntentId }),
  getPaymentHistory: () => api.get('/payments/history'),
};

// Rating API endpoints
export const ratingAPI = {
  createRating: (data) => api.post('/ratings', data),
  getRatings: (userId) => api.get(`/ratings/user/${userId}`),
  updateRating: (id, data) => api.put(`/ratings/${id}`, data),
};

export default api;
