import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  User, 
  Calendar,
  Briefcase,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const JobCard = ({ job, showActions = true, onApply, onSave, isSaved = false }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      cleaning: '🧹',
      gardening: '🌱',
      plumbing: '🔧',
      electrical: '⚡',
      painting: '🎨',
      carpentry: '🔨',
      moving: '📦',
      tutoring: '📚',
      cooking: '👨‍🍳',
      other: '💼'
    };
    return icons[category] || '💼';
  };

  const getCategoryColor = (category) => {
    const colors = {
      cleaning: 'bg-blue-100 text-blue-800',
      gardening: 'bg-green-100 text-green-800',
      plumbing: 'bg-orange-100 text-orange-800',
      electrical: 'bg-yellow-100 text-yellow-800',
      painting: 'bg-purple-100 text-purple-800',
      carpentry: 'bg-brown-100 text-brown-800',
      moving: 'bg-gray-100 text-gray-800',
      tutoring: 'bg-indigo-100 text-indigo-800',
      cooking: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatTimeAgo = (timeString) => {
    // Simple time formatting - in production, use a library like date-fns
    return timeString;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getCategoryIcon(job.category)}</span>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(job.category)}`}>
                {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
              </span>
              {job.urgent && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                  Urgent
                </span>
              )}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">{job.budget}</p>
            {job.budgetType && (
              <p className="text-xs text-gray-500">{job.budgetType}</p>
            )}
          </div>
        </div>

        {/* Title and Description */}
        <Link to={`/jobs/${job.id}`} className="block mb-3">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {job.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatTimeAgo(job.postedDate)}</span>
          </div>
          {job.schedule && (
            <>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="capitalize">{job.schedule.frequency}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{job.schedule.estimatedDuration}</span>
              </div>
            </>
          )}
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{job.postedBy}</p>
              {job.rating && (
                <div className="flex items-center text-xs text-gray-500">
                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                  <span>{job.rating} ({job.reviews} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-3 pt-4 border-t border-gray-100">
            <Link
              to={`/jobs/${job.id}`}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
            >
              View Details
            </Link>
            
            {onApply && (
              <button
                onClick={() => onApply(job)}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Apply Now
              </button>
            )}
            
            {onSave && (
              <button
                onClick={() => onSave(job)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  isSaved 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;
