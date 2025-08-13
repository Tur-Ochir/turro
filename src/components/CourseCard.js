import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiStar } from 'react-icons/fi';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <motion.div 
      className="course-card"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        <div className="course-overlay">
          <button className="btn-play">
            <FiPlay />
          </button>
        </div>
      </div>
      <div className="course-content">
        <div className="course-category">{course.category}</div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-meta">
          <div className="rating">
            <FiStar />
            <span>{course.rating} ({course.reviews.toLocaleString()} reviews)</span>
          </div>
          <div className="price">${course.price}</div>
        </div>
        <div className="course-instructor">
          <img src={course.instructorImage} alt={course.instructor} />
          <span>By {course.instructor}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
