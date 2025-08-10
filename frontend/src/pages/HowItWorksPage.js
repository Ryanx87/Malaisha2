import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  MessageSquare, 
  CreditCard, 
  Star,
  Shield,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  Users
} from 'lucide-react';

const HowItWorksPage = () => {
  const steps = [
    {
      number: '1',
      title: 'Create Your Profile',
      description: 'Sign up as a client or service provider. Complete your profile with skills, location, and experience.',
      icon: <UserPlus className="w-8 h-8" />,
      details: [
        'Quick registration process',
        'ID verification for South African users',
        'Skills portfolio for service providers',
        'Location-based matching'
      ]
    },
    {
      number: '2',
      title: 'Find or Post Jobs',
      description: 'Clients post jobs, service providers search and apply. Our smart matching connects the right people.',
      icon: <Search className="w-8 h-8" />,
      details: [
        'Location-based job matching',
        'Category and skill filtering',
        'Real-time job notifications',
        'Neighborhood-level precision'
      ]
    },
    {
      number: '3',
      title: 'Connect & Communicate',
      description: 'Chat directly with potential matches. Discuss details, negotiate terms, and build trust.',
      icon: <MessageSquare className="w-8 h-8" />,
      details: [
        'In-app messaging system',
        'Offline message queuing',
        'SMS notifications',
        'Multi-language support'
      ]
    },
    {
      number: '4',
      title: 'Secure Payment',
      description: 'Safe and secure payment processing with escrow protection for both parties.',
      icon: <CreditCard className="w-8 h-8" />,
      details: [
        'Escrow payment protection',
        'Multiple payment methods',
        'EFT and mobile money support',
        'Transparent pricing'
      ]
    },
    {
      number: '5',
      title: 'Rate & Review',
      description: 'Build your reputation through honest reviews and ratings from completed jobs.',
      icon: <Star className="w-8 h-8" />,
      details: [
        'Bidirectional rating system',
        'Photo verification of work',
        'Detailed review system',
        'Reputation building'
      ]
    }
  ];

  const forClients = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Post Your Job',
      description: 'Describe what you need done, set your budget, and specify your location.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Review Applications',
      description: 'Browse profiles, check ratings, and select the best service provider for your needs.'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Communicate',
      description: 'Chat with your chosen service provider to finalize details and schedule the work.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Get Work Done',
      description: 'Your service provider completes the job, and you release payment upon satisfaction.'
    }
  ];

  const forProviders = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Browse Jobs',
      description: 'Find jobs in your area that match your skills and availability.'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Apply & Connect',
      description: 'Send proposals to clients and communicate to understand their needs.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Complete Work',
      description: 'Deliver quality service according to the agreed terms and timeline.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Get Paid & Rated',
      description: 'Receive secure payment and build your reputation through client reviews.'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified Profiles',
      description: 'All service providers go through ID verification for your safety.'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Local Matching',
      description: 'Find workers in your neighborhood with township-level precision.'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile Optimized',
      description: 'Works on smartphones and feature phones with USSD support.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multi-Language',
      description: 'Available in South Africa\'s 11 official languages.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How Malaisha Works
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Connecting skilled professionals with clients across Africa through our innovative marketplace platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Steps to Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're looking for services or offering your skills, Malaisha makes it easy to connect and succeed
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                      {step.number}
                    </div>
                    <div className="text-blue-600">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-blue-600">
                          {step.icon}
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        Step {step.number}
                      </h4>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Clients
            </h2>
            <p className="text-xl text-gray-600">
              Get quality services from verified professionals in your area
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forClients.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Service Providers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Service Providers
            </h2>
            <p className="text-xl text-gray-600">
              Build your business and connect with clients who need your skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {forProviders.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-green-600">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Africa
            </h2>
            <p className="text-xl text-gray-600">
              Features designed specifically for the African market and context
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Safety & Trust
            </h2>
            <p className="text-xl text-gray-600">
              Your security and satisfaction are our top priorities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 text-center shadow-lg"
            >
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Verified Profiles
              </h3>
              <p className="text-gray-600">
                All service providers undergo ID verification and background checks for your peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 text-center shadow-lg"
            >
              <CreditCard className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Payments are held in escrow until work is completed to your satisfaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 text-center shadow-lg"
            >
              <Star className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                Our rating system and dispute resolution ensure high-quality service delivery.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professionals and clients already using Malaisha to connect and succeed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
