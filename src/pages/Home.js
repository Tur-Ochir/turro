import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiStar, FiUsers, FiAward, FiClock } from 'react-icons/fi';
import CourseCard from '../components/CourseCard';
import './Home.css';

const Home = () => {
  const featuredCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch to advanced level.',
      instructor: 'Alex Chen',
      rating: 4.8,
      reviews: 2100,
      price: 89.99,
      category: 'Development',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      title: 'Python for Data Science & ML',
      description: 'Master Python programming and machine learning algorithms for data analysis.',
      instructor: 'Maria Rodriguez',
      rating: 4.9,
      reviews: 1800,
      price: 129.99,
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '3',
      title: 'UI/UX Design Masterclass',
      description: 'Create stunning user interfaces and exceptional user experiences with modern design tools.',
      instructor: 'David Kim',
      rating: 4.7,
      reviews: 1500,
      price: 99.99,
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  ];

  const features = [
    {
      icon: <FiClock />,
      title: 'Learn at Your Own Pace',
      description: 'Access course content 24/7 and learn at your own speed with lifetime access to all materials.'
    },
    {
      icon: <FiUsers />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with years of experience in their respective fields.'
    },
    {
      icon: <FiAward />,
      title: 'Get Certified',
      description: 'Earn certificates upon completion to showcase your skills and advance your career.'
    },
    {
      icon: <FiStar />,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team and community forums.'
    }
  ];

  const testimonials = [
    {
      name: 'Emma Wilson',
      role: 'Full-Stack Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      text: 'Turro helped me transition from a marketing role to a full-stack developer. The courses are well-structured and the instructors are amazing!'
    },
    {
      name: 'James Brown',
      role: 'Data Scientist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
      text: 'The data science course was exactly what I needed to advance my career. The practical projects were invaluable for my portfolio.'
    },
    {
      name: 'Lisa Chen',
      role: 'UI/UX Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      text: 'I love how the courses are designed. The UI/UX course gave me the skills to land my dream job at a top tech company.'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Master New Skills
              <span className="gradient-text"> Online</span>
            </h1>
            <p className="hero-subtitle">
              Learn from industry experts and advance your career with our comprehensive online courses. 
              Join thousands of learners worldwide.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn-primary btn-large">
                Explore Courses
              </Link>
              <button className="btn-secondary btn-large">
                <FiPlay />
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>10K+</h3>
                <p>Students</p>
              </div>
              <div className="stat">
                <h3>500+</h3>
                <p>Courses</p>
              </div>
              <div className="stat">
                <h3>95%</h3>
                <p>Success Rate</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="floating-card">
              <div className="card-header">
                <div className="avatar"></div>
                <div className="user-info">
                  <h4>Sarah Johnson</h4>
                  <p>Web Development</p>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
              <p>75% Complete</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="courses">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Featured Courses</h2>
            <p>Discover the most popular courses chosen by our community</p>
          </motion.div>
          
          <div className="courses-grid">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="courses-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/courses" className="btn-primary btn-large">
              View All Courses
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why Choose Turro?</h2>
            <p>Everything you need to accelerate your learning journey</p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>What Our Students Say</h2>
            <p>Real stories from real learners</p>
          </motion.div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of students who have already transformed their careers with Turro.</p>
            <Link to="/register" className="btn-primary btn-large">
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
