import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  Award,
  BadgeCheck,
  Calendar,
  Briefcase,
  Shield,
  Edit,
  Heart,
  Share2
} from 'lucide-react';

const ProfileCard = ({ 
  profile, 
  showActions = true, 
  onContact, 
  onEdit, 
  onSave, 
  isSaved = false,
  isOwnProfile = false 
}) => {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const getVerificationBadge = (verificationLevel) => {
    switch (verificationLevel) {
      case 'verified':
        return (
          <div className="flex items-center space-x-1 text-blue-600">
            <BadgeCheck className="w-4 h-4" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        );
      case 'premium':
        return (
          <div className="flex items-center space-x-1 text-yellow-600">
            <Award className="w-4 h-4" />
            <span className="text-xs font-medium">Premium</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleContact = () => {
    if (onContact) {
      onContact(profile);
    } else {
      setShowContactInfo(!showContactInfo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {profile.avatar ? (
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>
              {profile.verificationLevel && (
                <div className="absolute -bottom-1 -right-1">
                  {getVerificationBadge(profile.verificationLevel)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-blue-100">{profile.profession}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{profile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Member since {profile.memberSince}</span>
                </div>
              </div>
            </div>
          </div>
          
          {showActions && (
            <div className="flex space-x-2">
              {!isOwnProfile && onSave && (
                <button
                  onClick={() => onSave(profile)}
                  className={`p-2 rounded-lg transition-colors ${
                    isSaved 
                      ? 'bg-white/20 text-white hover:bg-white/30' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              )}
              
              <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              
              {isOwnProfile && onEdit && (
                <button
                  onClick={() => onEdit(profile)}
                  className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profile.totalJobs}</div>
            <div className="text-sm text-gray-600">Jobs Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profile.rating}</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profile.responseRate}</div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{profile.avgResponseTime}</div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </div>
        </div>

        {/* Rating Display */}
        {profile.rating && (
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(profile.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`font-semibold ${getRatingColor(profile.rating)}`}>
              {profile.rating} ({profile.reviews} reviews)
            </span>
          </div>
        )}

        {/* About */}
        {profile.about && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-600 leading-relaxed">{profile.about}</p>
          </div>
        )}

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {profile.experience && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
            <div className="space-y-3">
              {profile.experience.map((exp, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{exp.title}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500">{exp.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {showContactInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
            <div className="space-y-3">
              {profile.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{profile.phone}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">{profile.email}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-gray-500" />
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-3 pt-4 border-t border-gray-100">
            {!isOwnProfile && (
              <button
                onClick={handleContact}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Contact
              </button>
            )}
            
            {!isOwnProfile && (
              <button
                onClick={() => window.open(`/profile/${profile.id}`, '_blank')}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View Full Profile
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
