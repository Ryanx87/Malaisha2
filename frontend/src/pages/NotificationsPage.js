import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Filter, 
  CheckCircle, 
  Trash2, 
  Settings,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationCard from '../components/UI/NotificationCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const NotificationsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    read: 'all',
    date: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [notifications, filters]);

  const fetchNotifications = async () => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockNotifications = [
        {
          id: 1,
          type: 'job',
          title: 'New Job Application',
          message: 'Sarah Johnson has applied for your "House Cleaning Service" job.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          additionalInfo: {
            job: { title: 'House Cleaning Service' },
            client: { name: 'Sarah Johnson' }
          },
          action: {
            type: 'view_job',
            data: { jobId: 123 }
          }
        },
        {
          id: 2,
          type: 'message',
          title: 'New Message',
          message: 'You have a new message from Mike Smith about your garden maintenance job.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false,
          additionalInfo: {
            client: { name: 'Mike Smith' }
          },
          action: {
            type: 'reply_message',
            data: { messageId: 456 }
          }
        },
        {
          id: 3,
          type: 'success',
          title: 'Payment Received',
          message: 'Payment of R800 has been received for the "Garden Maintenance" job.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true,
          additionalInfo: {
            amount: 'R800',
            job: { title: 'Garden Maintenance' }
          }
        },
        {
          id: 4,
          type: 'rating',
          title: 'New Review',
          message: 'You received a 5-star review from Lisa Brown for your excellent work.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          read: true,
          additionalInfo: {
            client: { name: 'Lisa Brown' },
            rating: 5
          },
          action: {
            type: 'view_profile',
            data: { clientId: 789 }
          }
        },
        {
          id: 5,
          type: 'info',
          title: 'Profile Update',
          message: 'Your profile has been successfully updated with new skills and experience.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
          read: true
        }
      ];

      setNotifications(mockNotifications);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  const filterNotifications = () => {
    let filtered = [...notifications];

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(n => n.type === filters.type);
    }

    // Filter by read status
    if (filters.read !== 'all') {
      const isRead = filters.read === 'read';
      filtered = filtered.filter(n => n.read === isRead);
    }

    // Filter by date
    if (filters.date !== 'all') {
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      const oneWeek = 7 * oneDay;
      const oneMonth = 30 * oneDay;

      filtered = filtered.filter(n => {
        const diff = now - n.timestamp;
        switch (filters.date) {
          case 'today':
            return diff < oneDay;
          case 'week':
            return diff < oneWeek;
          case 'month':
            return diff < oneMonth;
          default:
            return true;
        }
      });
    }

    setFilteredNotifications(filtered);
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      // TODO: API call to mark as read
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      // TODO: API call to delete notification
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleBulkAction = async (action) => {
    try {
      if (action === 'mark_read') {
        setNotifications(prev => 
          prev.map(n => 
            selectedNotifications.includes(n.id) ? { ...n, read: true } : n
          )
        );
      } else if (action === 'delete') {
        setNotifications(prev => 
          prev.filter(n => !selectedNotifications.includes(n.id))
        );
      }
      
      setSelectedNotifications([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Error performing bulk action:', error);
    }
  };

  const handleNotificationAction = (action) => {
    // Handle different notification actions
    console.log('Notification action:', action);
    // TODO: Implement navigation or other actions based on action type
  };

  const toggleNotificationSelection = (notificationId) => {
    setSelectedNotifications(prev => {
      if (prev.includes(notificationId)) {
        return prev.filter(id => id !== notificationId);
      } else {
        return [...prev, notificationId];
      }
    });
  };

  const getUnreadCount = () => notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="w-8 h-8 text-blue-600" />
                {getUnreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {getUnreadCount()}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">
                  {getUnreadCount()} unread • {notifications.length} total
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Bulk Actions
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="job">Jobs</option>
                    <option value="message">Messages</option>
                    <option value="payment">Payments</option>
                    <option value="rating">Ratings</option>
                    <option value="success">Success</option>
                    <option value="info">Info</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.read}
                    onChange={(e) => setFilters(prev => ({ ...prev, read: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <select
                    value={filters.date}
                    onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bulk Actions */}
        <AnimatePresence>
          {showBulkActions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedNotifications.length} notification(s) selected
                  </span>
                  <button
                    onClick={() => setSelectedNotifications([])}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear selection
                  </button>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleBulkAction('mark_read')}
                    disabled={selectedNotifications.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Mark as Read
                  </button>
                  
                  <button
                    onClick={() => handleBulkAction('delete')}
                    disabled={selectedNotifications.length === 0}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4 inline mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-600">
                  {filters.type !== 'all' || filters.read !== 'all' || filters.date !== 'all'
                    ? 'Try adjusting your filters'
                    : 'You\'re all caught up!'}
                </p>
              </motion.div>
            ) : (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  {/* Selection Checkbox */}
                  {showBulkActions && (
                    <div className="absolute top-4 right-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => toggleNotificationSelection(notification.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  )}
                  
                  <NotificationCard
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                    onAction={handleNotificationAction}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
