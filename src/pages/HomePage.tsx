import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { ArrowRight, Shield, Cloud, Zap, Star, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Your files are encrypted and stored securely with enterprise-grade protection.',
    },
    {
      icon: Cloud,
      title: 'Cloud Access',
      description: 'Access your photos and videos from anywhere, anytime, on any device.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures quick uploads and instant file previews.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to <span className="gradient-text">PixNDrive</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Store and access your photos & videos securely. Experience the future of cloud storage with our modern, intuitive platform.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/about"
                className="flex items-center space-x-3 px-8 py-4 bg-white/80 backdrop-blur-md text-gray-700 font-medium rounded-2xl hover:bg-white transition-all duration-300 border border-white/20 shadow-soft"
              >
                <span>Learn More</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className="text-2xl font-bold text-gray-800">4.9</span>
                </div>
                <p className="text-gray-600">User Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-blue-500 mr-1" />
                  <span className="text-2xl font-bold text-gray-800">10K+</span>
                </div>
                <p className="text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Cloud className="w-5 h-5 text-green-500 mr-1" />
                  <span className="text-2xl font-bold text-gray-800">99.9%</span>
                </div>
                <p className="text-gray-600">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Why Choose <span className="gradient-text">PixNDrive</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of security, performance, and user-friendly design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-soft border border-white/20 hover:shadow-glow transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:shadow-glow transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white shadow-glow animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust PixNDrive for their precious memories.
            </p>
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-soft"
            >
              <span>{isAuthenticated ? "Go to Dashboard" : "Start Free Today"}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;