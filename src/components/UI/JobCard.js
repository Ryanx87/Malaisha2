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
  CheckCircle,
  Heart,
  Eye,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

const JobCard = ({ job, showActions = true, onApply, onSave, isSaved = false, index = 0 }) => {
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
      cleaning: 'from-blue-500 to-cyan-500',
      gardening: 'from-green-500 to-emerald-500',
      plumbing: 'from-orange-500 to-red-500',
      electrical: 'from-yellow-500 to-orange-500',
      painting: 'from-purple-500 to-pink-500',
      carpentry: 'from-amber-500 to-orange-500',
      moving: 'from-gray-500 to-slate-500',
      tutoring: 'from-indigo-500 to-purple-500',
      cooking: 'from-red-500 to-pink-500',
      other: 'from-gray-500 to-gray-600'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-green-100 text-green-700 border-green-200',
      in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
      completed: 'bg-gray-100 text-gray-700 border-gray-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatTimeAgo = (timeString) => {
    return timeString;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(job.category)} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}>
              {getCategoryIcon(job.category)}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 border">
                {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
              </span>
              {job.urgent && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-200 animate-pulse">
                  🔥 Urgent
                </span>
              )}
              {job.status && (
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(job.status)}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {job.budget}
            </p>
            {job.budgetType && (
              <p className="text-xs text-gray-500 font-medium">{job.budgetType}</p>
            )}
          </div>
        </div>

        {/* Job Title */}
        <Link to={`/jobs/${job.id}`} className="block mb-3 group-hover:text-blue-600 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
            {job.title}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Job Meta Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="truncate font-medium">{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2 text-green-500" />
            <span className="font-medium">{formatTimeAgo(job.postedDate)}</span>
          </div>
          {job.schedule && (
            <>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                <span className="capitalize font-medium">{job.schedule.frequency}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Briefcase className="w-4 h-4 mr-2 text-orange-500" />
                <span className="font-medium">{job.schedule.estimatedDuration}</span>
              </div>
            </>
          )}
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{job.postedBy}</p>
              {job.rating && (
                <div className="flex items-center text-xs text-gray-500">
                  <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
                  <span className="font-medium">{job.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{job.reviews} reviews</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>24</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" />
              <span>5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      {showActions && (
        <div className="px-6 pb-6">
          <div className="flex space-x-3">
            <Link
              to={`/jobs/${job.id}`}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 text-center font-semibold text-sm"
            >
              View Details
            </Link>
            
            {onApply && (
              <button
                onClick={() => onApply(job)}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold text-sm"
              >
                Apply Now
              </button>
            )}
            
            {onSave && (
              <button
                onClick={() => onSave(job)}
                className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                  isSaved 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </motion.div>
  );
};

export default JobCard;