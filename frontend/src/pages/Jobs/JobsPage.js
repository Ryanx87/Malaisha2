import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Briefcase,
  User,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'all',
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
    'all',
    'Johannesburg',
    'Pretoria',
    'Cape Town',
    'Durban',
    'Port Elizabeth',
    'Bloemfontein',
    'East London',
    'Kimberley'
  ];

  const budgetRanges = [
    'all',
    'R0 - R200',
    'R200 - R500',
    'R500 - R1000',
    'R1000 - R2000',
    'R2000+'
  ];

  useEffect(() => {
    // TODO: Fetch jobs from API
    const fetchJobs = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API calls
        const mockJobs = [
          {
            id: 1,
            title: 'House Cleaning Service',
            description: 'Need a reliable house cleaner for weekly cleaning. 3 bedroom house in Sandton.',
            category: 'cleaning',
            location: 'Johannesburg',
            budget: 'R500',
            budgetRange: 'R500 - R1000',
            postedBy: 'Sarah Johnson',
            postedDate: '2 hours ago',
            rating: 4.8,
            reviews: 12,
            urgent: true
          },
          {
            id: 2,
            title: 'Garden Maintenance',
            description: 'Looking for someone to maintain our garden weekly. Includes mowing, pruning, and weeding.',
            category: 'gardening',
            location: 'Pretoria',
            budget: 'R800',
            budgetRange: 'R500 - R1000',
            postedBy: 'Mike Smith',
            postedDate: '1 day ago',
            rating: 4.5,
            reviews: 8,
            urgent: false
          },
          {
            id: 3,
            title: 'Plumbing Repair',
            description: 'Leaking tap in kitchen needs fixing. Simple repair job.',
            category: 'plumbing',
            location: 'Cape Town',
            budget: 'R300',
            budgetRange: 'R200 - R500',
            postedBy: 'David Wilson',
            postedDate: '3 hours ago',
            rating: 4.9,
            reviews: 25,
            urgent: true
          },
          {
            id: 4,
            title: 'Moving Assistance',
            description: 'Need help moving furniture from 2nd floor apartment to ground floor.',
            category: 'moving',
            location: 'Durban',
            budget: 'R1200',
            budgetRange: 'R1000 - R2000',
            postedBy: 'Lisa Brown',
            postedDate: '2 days ago',
            rating: 4.7,
            reviews: 15,
            urgent: false
          },
          {
            id: 5,
            title: 'Math Tutoring',
            description: 'Looking for a math tutor for my 15-year-old son. Grade 10 level.',
            category: 'tutoring',
            location: 'Johannesburg',
            budget: 'R400',
            budgetRange: 'R200 - R500',
            postedBy: 'Emma Davis',
            postedDate: '1 day ago',
            rating: 4.6,
            reviews: 9,
            urgent: false
          }
        ];

        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter jobs based on search and filters
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    if (selectedBudget !== 'all') {
      filtered = filtered.filter(job => job.budgetRange === selectedBudget);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedCategory, selectedLocation, selectedBudget]);

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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'cleaning':
        return 'bg-blue-100 text-blue-800';
      case 'gardening':
        return 'bg-green-100 text-green-800';
      case 'plumbing':
        return 'bg-orange-100 text-orange-800';
      case 'electrical':
        return 'bg-yellow-100 text-yellow-800';
      case 'painting':
        return 'bg-purple-100 text-purple-800';
      case 'carpentry':
        return 'bg-red-100 text-red-800';
      case 'moving':
        return 'bg-indigo-100 text-indigo-800';
      case 'tutoring':
        return 'bg-pink-100 text-pink-800';
      case 'cooking':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Jobs</h1>
          <p className="text-gray-600">
            Find the perfect job that matches your skills and location
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {budgetRanges.map(budget => (
                    <option key={budget} value={budget}>
                      {budget === 'all' ? 'All Budgets' : budget}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Job Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(job.category)}</span>
                    <div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(job.category)}`}>
                        {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                      </span>
                      {job.urgent && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{job.budget}</p>
                    <p className="text-sm text-gray-500">{job.budgetRange}</p>
                  </div>
                </div>

                {/* Job Title and Description */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link to={`/jobs/${job.id}`} className="hover:text-blue-600 transition-colors">
                    {job.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

                {/* Job Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-2" />
                    {job.postedBy}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {job.postedDate}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    {job.rating} ({job.reviews} reviews)
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/jobs/${job.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLocation('all');
                setSelectedBudget('all');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
