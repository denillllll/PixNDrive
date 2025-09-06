import React from 'react';
import Navbar from '../components/Navbar';
import { Shield, Zap, Heart, Users, Award, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption ensures your precious memories stay safe and private.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant uploads and seamless file management.',
    },
    {
      icon: Heart,
      title: 'User-Centered Design',
      description: 'Intuitive interface designed with your experience and workflow in mind.',
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Share and collaborate on your files with friends and family effortlessly.',
    },
    {
      icon: Award,
      title: 'Enterprise Grade',
      description: 'Reliable infrastructure trusted by professionals and businesses worldwide.',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your files from anywhere in the world with our global CDN.',
    },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            About PixNDrive
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            PixNDrive helps you store your memories safely with secure cloud access powered by n8n workflows. 
            We're revolutionizing how people manage and share their digital life.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Mission</h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-glow">
              <p className="text-xl md:text-2xl leading-relaxed">
                "To create a seamless, secure, and beautiful platform where your precious memories 
                are not just stored, but celebrated. We believe that managing your digital life 
                should be as simple as sharing a smile."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Why Choose <span className="gradient-text">PixNDrive</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology and designed for the modern user.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-soft border border-white/20 hover:shadow-glow transition-all duration-300 group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
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

      {/* Team Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind PixNDrive's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center shadow-soft border border-white/20 hover:shadow-glow transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-2xl mx-auto mb-6 object-cover shadow-soft"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-12 text-white text-center shadow-glow animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-blue-100">Files Stored</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;