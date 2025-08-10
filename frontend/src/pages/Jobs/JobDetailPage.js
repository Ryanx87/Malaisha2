import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  User, 
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Shield,
  Clock4,
  Users,
  FileText,
  Award,
  BadgeCheck,
  PhoneCall,
  Mail as MailIcon
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockJob = {
      id: parseInt(id),
      title: 'House Cleaning Service',
      description: 'Need a reliable house cleaner for weekly cleaning. 3 bedroom house in Sandton. Looking for someone who is detail-oriented, trustworthy, and has experience with residential cleaning. The job includes dusting, vacuuming, mopping floors, cleaning bathrooms and kitchen, and general tidying up.',
      category: 'cleaning',
      location: 'Sandton, Johannesburg',
      budget: 'R500',
      budgetType: 'per visit',
      postedBy: 'Sarah Johnson',
      postedDate: '2 hours ago',
      rating: 4.8,
      reviews: 12,
      urgent: true,
      status: 'open',
      requirements: [
        'Minimum 2 years cleaning experience',
        'References from previous clients',
        'Own cleaning supplies preferred',
        'Available on weekends',
        'Reliable transportation'
      ],
      schedule: {
        frequency: 'weekly',
        preferredTime: 'Saturday mornings',
        estimatedDuration: '3-4 hours'
      },
      clientInfo: {
        verified: true,
        memberSince: '2022',
        totalJobs: 8,
        responseRate: '95%',
        avgResponseTime: '2 hours'
      }
    };

    // Check if user has already applied
    if (user?.user_type === 'provider') {
      // Mock application status - replace with API call
      setApplicationStatus('not_applied'); // 'applied', 'accepted', 'rejected', 'not_applied'
    }

    setTimeout(() => {
      setJob(mockJob);
      setLoading(false);
    }, 1000);
  }, [id, user]);

  const handleApply = async (formData) => {
    try {
      // TODO: Submit application to API
      console.log('Submitting application:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setApplicationStatus('applied');
      setShowApplyModal(false);
      
      // Show success message
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleContact = () => {
    setShowContactModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Job not found</h3>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700 font-medium">
            Browse other jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Jobs
          </button>
        </motion.div>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🧹</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                  {job.category.charAt(0).toUpperCase() + job.category.slice(1)}
                </span>
                {job.urgent && (
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
                    Urgent
                  </span>
                )}
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">{job.budget}</p>
              <p className="text-sm text-gray-500">{job.budgetType}</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{job.postedDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              <span>{job.rating} ({job.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">{job.postedBy}</p>
                  {job.clientInfo.verified && (
                    <BadgeCheck className="w-5 h-5 text-blue-600" title="Verified Client" />
                  )}
                </div>
                <p className="text-sm text-gray-500">Client • Member since {job.clientInfo.memberSince}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <span>{job.clientInfo.totalJobs} jobs posted</span>
                  <span>{job.clientInfo.responseRate} response rate</span>
                  <span>~{job.clientInfo.avgResponseTime} avg response</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {user?.user_type === 'provider' && applicationStatus === 'not_applied' && (
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply for Job
                </button>
              )}
              
              {user?.user_type === 'provider' && applicationStatus === 'applied' && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Application Submitted</span>
                </div>
              )}
              
              {user?.user_type === 'provider' && applicationStatus === 'accepted' && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Application Accepted!</span>
                </div>
              )}
              
              <button
                onClick={handleContact}
                className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Contact Client
              </button>
            </div>
          </div>
        </motion.div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Job Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Job Description
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
            <ul className="space-y-2 mb-6">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Job Details Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Schedule & Duration */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-medium text-gray-900 capitalize">{job.schedule.frequency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Preferred Time:</span>
                  <span className="font-medium text-gray-900">{job.schedule.preferredTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-900">{job.schedule.estimatedDuration}</span>
                </div>
              </div>
            </div>

            {/* Client Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Client Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Jobs:</span>
                  <span className="font-medium text-gray-900">{job.clientInfo.totalJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Rate:</span>
                  <span className="font-medium text-gray-900">{job.clientInfo.responseRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg Response:</span>
                  <span className="font-medium text-gray-900">{job.clientInfo.avgResponseTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Apply for Job</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleApply({
                proposedRate: formData.get('proposedRate'),
                message: formData.get('message'),
                availability: formData.get('availability')
              });
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Rate (R)
                </label>
                <input
                  name="proposedRate"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  name="availability"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="immediate">Immediate</option>
                  <option value="this_week">This week</option>
                  <option value="next_week">Next week</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message to Client
                </label>
                <textarea
                  name="message"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell the client why you're the best person for this job..."
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Client</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">+27 82 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MailIcon className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">sarah.johnson@email.com</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Send message through platform</span>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                onClick={() => setShowContactModal(false)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
