import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { FiPlay, FiClock, FiUser, FiStar, FiBookOpen, FiCheck } from 'react-icons/fi';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCourse, enrollInCourse } = useCourses();
  const { currentUser } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const courseData = await fetchCourse(id);
        setCourse(courseData);
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id, fetchCourse]);

  const handleEnroll = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      await enrollInCourse(id);
      // You could show a success message or redirect to the course content
    } catch (error) {
      console.error('Error enrolling in course:', error);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="course-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <p>The course you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/courses')} className="btn-primary">
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <div className="course-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="course-hero-content"
        >
          <div className="course-image-container">
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-overlay">
              <FiPlay className="play-icon" />
            </div>
          </div>
          
          <div className="course-info">
            <div className="course-category">{course.category}</div>
            <h1 className="course-title">{course.title}</h1>
            <p className="course-description">{course.description}</p>
            
            <div className="course-meta">
              <div className="meta-item">
                <FiUser className="meta-icon" />
                <span>{course.instructor}</span>
              </div>
              <div className="meta-item">
                <FiClock className="meta-icon" />
                <span>{course.duration}</span>
              </div>
              <div className="meta-item">
                <FiStar className="meta-icon" />
                <span>{course.rating} ({course.reviews} reviews)</span>
              </div>
              <div className="meta-item">
                <FiBookOpen className="meta-icon" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>

            <div className="course-price">
              <span className="price">${course.price}</span>
              {course.originalPrice && (
                <span className="original-price">${course.originalPrice}</span>
              )}
            </div>

            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="enroll-button"
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="course-content">
        <div className="content-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="course-details"
          >
            <h2>What you'll learn</h2>
            <div className="learning-objectives">
              {course.objectives?.map((objective, index) => (
                <div key={index} className="objective-item">
                  <FiCheck className="check-icon" />
                  <span>{objective}</span>
                </div>
              ))}
            </div>

            <h2>Course Content</h2>
            <div className="course-curriculum">
              {course.curriculum?.map((section, index) => (
                <div key={index} className="curriculum-section">
                  <h3>{section.title}</h3>
                  <div className="section-lessons">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="lesson-item">
                        <FiPlay className="lesson-icon" />
                        <span>{lesson.title}</span>
                        <span className="lesson-duration">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="course-sidebar"
          >
            <div className="sidebar-card">
              <h3>Course Features</h3>
              <ul className="features-list">
                <li>Lifetime access</li>
                <li>Certificate of completion</li>
                <li>Mobile and desktop access</li>
                <li>Downloadable resources</li>
                <li>30-day money-back guarantee</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Instructor</h3>
              <div className="instructor-info">
                <img src={course.instructorImage || '/default-instructor.jpg'} alt={course.instructor} />
                <div>
                  <h4>{course.instructor}</h4>
                  <p>{course.instructorBio}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
