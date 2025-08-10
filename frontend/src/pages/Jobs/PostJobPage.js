import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    budget: '',
    budgetType: 'fixed',
    urgency: 'normal',
    schedule: {
      frequency: 'one-time',
      preferredTime: '',
      estimatedDuration: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'cleaning',
    'gardening',
    'plumbing',
    'electrical',
    'painting',
    'carpentry',
    'moving',
    'tutoring',
    'cooking',
    'other'
  ];

  const locations = [
    'Johannesburg',
    'Pretoria',
    'Cape Town',
    'Durban',
    'Port Elizabeth',
    'Bloemfontein',
    'East London',
    'Kimberley'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.location) {
      newErrors.location = 'Please select a location';
    }

    if (!formData.budget.trim()) {
      newErrors.budget = 'Budget is required';
    }

    if (formData.schedule.frequency === 'recurring' && !formData.schedule.preferredTime) {
      newErrors.preferredTime = 'Preferred time is required for recurring jobs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Submit job to API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Show success and redirect
      navigate('/dashboard');
    } catch (error) {
      console.error('Error posting job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'cleaning':
        return '🧹';
      case 'gardening':
        return '🌱';
      case 'plumbing':
        return '🔧';
      case 'electrical':
        return '⚡';
      case 'painting':
        return '🎨';
      case 'carpentry':
        return '🔨';
      case 'moving':
        return '📦';
      case 'tutoring':
        return '📚';
      case 'cooking':
        return '👨‍🍳';
      default:
        return '💼';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">
            Describe what you need and connect with skilled service providers in your area
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 space-y-6"
        >
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., House Cleaning Service, Garden Maintenance"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Category and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select a location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
              placeholder="Describe what you need in detail. Include any specific requirements, preferences, or special instructions..."
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Be specific about what you need. The more details you provide, the better matches you'll get.
            </p>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget *
            </label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="500"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.budget ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              <div className="w-32">
                <select
                  name="budgetType"
                  value={formData.budgetType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="fixed">Fixed</option>
                  <option value="hourly">Per Hour</option>
                  <option value="daily">Per Day</option>
                </select>
              </div>
            </div>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Set a realistic budget to attract quality service providers.
            </p>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="urgency"
                  value="normal"
                  checked={formData.urgency === 'normal'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Normal</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="urgency"
                  value="urgent"
                  checked={formData.urgency === 'urgent'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Urgent</span>
              </label>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <select
                  name="schedule.frequency"
                  value={formData.schedule.frequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="one-time">One-time</option>
                  <option value="recurring">Recurring</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div>
                <input
                  type="text"
                  name="schedule.preferredTime"
                  value={formData.schedule.preferredTime}
                  onChange={handleInputChange}
                  placeholder="Preferred time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="schedule.estimatedDuration"
                  value={formData.schedule.estimatedDuration}
                  onChange={handleInputChange}
                  placeholder="Estimated duration"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {errors.preferredTime && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredTime}</p>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">💡 Tips for a Great Job Post</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific about what you need</li>
              <li>• Include any special requirements or preferences</li>
              <li>• Set a realistic budget</li>
              <li>• Mention if you need someone urgently</li>
              <li>• Provide clear contact information</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Posting Job...
                </>
              ) : (
                <>
                  <Briefcase className="w-4 h-4 mr-2" />
                  Post Job
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default PostJobPage;
