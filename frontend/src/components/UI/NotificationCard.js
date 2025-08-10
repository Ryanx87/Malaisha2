import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X,
  Clock,
  User,
  Briefcase,
  DollarSign,
  MessageSquare,
  Star
} from 'lucide-react';

const NotificationCard = ({ 
  notification, 
  onMarkAsRead, 
  onDelete, 
  onAction 
}) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'job':
        return <Briefcase className="w-5 h-5 text-purple-600" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-indigo-600" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'rating':
        return <Star className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      case 'job':
        return 'border-l-purple-500 bg-purple-50';
      case 'message':
        return 'border-l-indigo-500 bg-indigo-50';
      case 'payment':
        return 'border-l-green-500 bg-green-50';
      case 'rating':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getActionButton = (action) => {
    if (!action) return null;

    switch (action.type) {
      case 'view_job':
        return (
          <button
            onClick={() => onAction && onAction(action)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Job
          </button>
        );
      case 'reply_message':
        return (
          <button
            onClick={() => onAction && onAction(action)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reply
          </button>
        );
      case 'accept_job':
        return (
          <button
            onClick={() => onAction && onAction(action)}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
          >
            Accept
          </button>
        );
      case 'view_profile':
        return (
          <button
            onClick={() => onAction && onAction(action)}
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Profile
          </button>
        );
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp) => {
    // Simple time formatting - in production, use a library like date-fns
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className={`border-l-4 ${getNotificationColor(notification.type)} bg-white rounded-r-lg shadow-sm hover:shadow-md transition-all duration-200 ${
        !notification.read ? 'ring-2 ring-blue-200' : ''
      }`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {getNotificationIcon(notification.type)}
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">
                {notification.title}
              </span>
              {!notification.read && (
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {formatTimeAgo(notification.timestamp)}
            </span>
            
            <div className="flex space-x-1">
              {!notification.read && onMarkAsRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Mark as read"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={() => onDelete(notification.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete notification"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          {notification.message}
        </p>

        {/* Additional Info */}
        {notification.additionalInfo && (
          <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
            {notification.additionalInfo.job && (
              <div className="flex items-center space-x-2 text-sm">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">
                  <strong>Job:</strong> {notification.additionalInfo.job.title}
                </span>
              </div>
            )}
            
            {notification.additionalInfo.client && (
              <div className="flex items-center space-x-2 text-sm mt-1">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">
                  <strong>Client:</strong> {notification.additionalInfo.client.name}
                </span>
              </div>
            )}
            
            {notification.additionalInfo.amount && (
              <div className="flex items-center space-x-2 text-sm mt-1">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">
                  <strong>Amount:</strong> {notification.additionalInfo.amount}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        {notification.action && (
          <div className="flex justify-end">
            {getActionButton(notification.action)}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationCard;
