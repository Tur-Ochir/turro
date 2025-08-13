import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCourses } from '../contexts/CourseContext';
import CourseCard from '../components/CourseCard';
import { FiSearch, FiFilter } from 'react-icons/fi';
import './Courses.css';

const Courses = () => {
  const { courses, fetchCourses } = useCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      await fetchCourses();
      setLoading(false);
    };
    loadCourses();
  }, [fetchCourses]);

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory]);

  const categories = ['all', 'web development', 'mobile development', 'data science', 'design', 'business', 'marketing'];

  if (loading) {
    return (
      <div className="courses-loading">
        <div className="loading-spinner"></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>All Courses</h1>
          <p>Discover the perfect course to advance your skills</p>
        </motion.div>
      </div>

      <div className="courses-filters">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="search-container"
        >
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="category-filters"
        >
          <FiFilter className="filter-icon" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      <div className="courses-grid">
        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="no-courses"
          >
            <h3>No courses found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </motion.div>
        ) : (
          filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Courses;
