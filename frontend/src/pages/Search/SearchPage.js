import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, DollarSign, Clock, Star, Briefcase, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobCard from '../../components/UI/JobCard';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    budget: '',
    urgency: false,
    verified: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock search results - replace with API call
    const mockJobs = [
      {
        id: 1,
        title: 'House Cleaning Service',
        description: 'Need a reliable house cleaner for weekly cleaning. 3 bedroom house in Sandton.',
        category: 'cleaning',
        location: 'Sandton, Johannesburg',
        budget: 'R500',
        budgetType: 'per visit',
        postedBy: 'Sarah Johnson',
        postedDate: '2 hours ago',
        rating: 4.8,
        reviews: 12,
        urgent: true,
        verified: true
      },
      {
        id: 2,
        title: 'Garden Maintenance',
        description: 'Looking for a gardener to maintain our garden weekly. Includes mowing, pruning, and general upkeep.',
        category: 'gardening',
        location: 'Pretoria East',
        budget: 'R800',
        budgetType: 'per month',
        postedBy: 'Mike Thompson',
        postedDate: '1 day ago',
        rating: 4.6,
        reviews: 8,
        urgent: false,
        verified: true
      },
      {
        id: 3,
        title: 'Plumbing Repair',
        description: 'Urgent plumbing issue - leaking pipe under kitchen sink. Need immediate attention.',
        category: 'plumbing',
        location: 'Centurion',
        budget: 'R300',
        budgetType: 'per hour',
        postedBy: 'Lisa Chen',
        postedDate: '3 hours ago',
        rating: 4.9,
        reviews: 15,
        urgent: true,
        verified: false
      }
    ];

    setJobs(mockJobs);
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual search API call
      console.log('Searching with query:', searchQuery, 'and filters:', filters);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter jobs based on search criteria
      let filteredJobs = jobs.filter(job => {
        const matchesQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !filters.category || job.category === filters.category;
        const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesUrgency = !filters.urgency || job.urgent;
        const matchesVerified = !filters.verified || job.verified;
        
        return matchesQuery && matchesCategory && matchesLocation && matchesUrgency && matchesVerified;
      });
      
      setJobs(filteredJobs);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      budget: '',
      urgency: false,
      verified: false
    });
  };

  const categories = [
    'cleaning', 'gardening', 'plumbing', 'electrical', 'painting', 
    'carpentry', 'moving', 'pet care', 'tutoring', 'other'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Jobs</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jobs, skills, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </motion.div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select
                  value={filters.budget}
                  onChange={(e) => setFilters(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Budget</option>
                  <option value="0-200">R0 - R200</option>
                  <option value="200-500">R200 - R500</option>
                  <option value="500-1000">R500 - R1000</option>
                  <option value="1000+">R1000+</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.urgency}
                    onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.checked }))}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Urgent Only</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.verified}
                    onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.checked }))}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Verified Only</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
            </h2>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select className="border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500">
                <option value="recent">Most Recent</option>
                <option value="budget-high">Highest Budget</option>
                <option value="budget-low">Lowest Budget</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more jobs.
              </p>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;
