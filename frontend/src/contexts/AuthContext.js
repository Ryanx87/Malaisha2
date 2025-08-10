import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api, { authAPI } from '../services/api';

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  isAuthenticated: false
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: !!action.payload
      };
    
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      };
    
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Set auth token in API headers
  useEffect(() => {
    if (state.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (state.token && !state.user) {
        try {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
          
          const response = await authAPI.getCurrentUser();
          
          if (response.data.success) {
            dispatch({
              type: AUTH_ACTIONS.SET_USER,
              payload: {
                user: response.data.data.user,
                token: state.token
              }
            });
          } else {
            // Invalid token, remove it
            localStorage.removeItem('token');
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
          }
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      }
    };

    checkAuth();
  }, [state.token]);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await authAPI.login({
        email,
        password
      });

      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: { user, token }
        });

        toast.success('Login successful!');
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await authAPI.register(userData);

      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: { user, token }
        });

        toast.success('Registration successful! Please check your email for verification.');
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (state.token) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Remove token from localStorage
      localStorage.removeItem('token');
      
      // Clear auth state
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      
      // Clear API headers
      delete api.defaults.headers.common['Authorization'];
      
      toast.success('Logged out successfully');
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      const response = await api.put('/api/users/profile', profileData);

      if (response.data.success) {
        const updatedUser = response.data.data.user;
        
        dispatch({
          type: AUTH_ACTIONS.UPDATE_USER,
          payload: updatedUser
        });

        toast.success('Profile updated successfully!');
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Profile update failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Profile update failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      const response = await api.put('/api/users/change-password', {
        current_password: currentPassword,
        new_password: newPassword
      });

      if (response.data.success) {
        toast.success('Password changed successfully!');
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Password change failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password change failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Verify email
  const verifyEmail = async (token) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      const response = await authAPI.verifyEmail(token);

      if (response.data.success) {
        // Update user verification status
        dispatch({
          type: AUTH_ACTIONS.UPDATE_USER,
          payload: { verification_status: 'verified' }
        });

        toast.success('Email verified successfully!');
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Email verification failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Email verification failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      const response = await authAPI.forgotPassword(email);

      if (response.data.success) {
        toast.success('Password reset link sent to your email!');
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Password reset request failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password reset request failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      const response = await authAPI.resetPassword(token, newPassword);

      if (response.data.success) {
        toast.success('Password reset successfully!');
        return { success: true };
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password reset failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Context value
  const value = {
    // State
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    verifyEmail,
    forgotPassword,
    resetPassword,
    
    // Utility functions
    clearError: () => dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
