import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import { FiUser, FiMail, FiBookOpen, FiPlay, FiCheck, FiClock } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { courses } = useCourses();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading enrolled courses
    // In a real app, you'd fetch this from Firebase
    setTimeout(() => {
      const mockEnrolledCourses = courses.slice(0, 3).map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
        lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
      }));
      setEnrolledCourses(mockEnrolledCourses);
      setLoading(false);
    }, 1000);
  }, [courses]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Welcome back, {currentUser?.displayName || 'Learner'}!</h1>
          <p>Continue your learning journey</p>
        </motion.div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="profile-card"
          >
            <div className="profile-header">
              <div className="profile-avatar">
                <FiUser />
              </div>
              <div className="profile-info">
                <h3>{currentUser?.displayName || 'User'}</h3>
                <p>{currentUser?.email}</p>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <FiBookOpen className="stat-icon" />
                <div>
                  <span className="stat-number">{enrolledCourses.length}</span>
                  <span className="stat-label">Enrolled Courses</span>
                </div>
              </div>
              <div className="stat-item">
                <FiClock className="stat-icon" />
                <div>
                  <span className="stat-number">
                    {enrolledCourses.reduce((total, course) => total + course.progress, 0) / enrolledCourses.length || 0}%
                  </span>
                  <span className="stat-label">Average Progress</span>
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Sign Out
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="courses-section"
          >
            <h2>My Courses</h2>
            {enrolledCourses.length === 0 ? (
              <div className="no-courses">
                <FiBookOpen className="no-courses-icon" />
                <h3>No courses enrolled yet</h3>
                <p>Start your learning journey by enrolling in a course</p>
              </div>
            ) : (
              <div className="enrolled-courses">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="course-item"
                  >
                    <div className="course-image">
                      <img src={course.image} alt={course.title} />
                      <div className="course-overlay">
                        <FiPlay className="play-icon" />
                      </div>
                    </div>
                    <div className="course-details">
                      <h3>{course.title}</h3>
                      <p>{course.instructor}</p>
                      <div className="progress-container">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{course.progress}% Complete</span>
                      </div>
                      <div className="course-actions">
                        <button className="continue-button">
                          Continue Learning
                        </button>
                        <span className="last-accessed">
                          Last accessed: {course.lastAccessed.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="recent-activity"
          >
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {enrolledCourses.slice(0, 3).map((course, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    <FiCheck />
                  </div>
                  <div className="activity-content">
                    <p>Completed lesson in <strong>{course.title}</strong></p>
                    <span className="activity-time">
                      {new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
