import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db, isFirebaseAvailable } from '../firebase/config';

const CourseContext = createContext();

export function useCourses() {
  return useContext(CourseContext);
}

// Fallback course data for development
const fallbackCourses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, and Node.js from scratch to advanced concepts.',
    instructor: 'Sarah Johnson',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 1247,
    duration: '45 hours',
    lessons: 156,
    category: 'web development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    objectives: [
      'Build responsive websites from scratch',
      'Master JavaScript ES6+ features',
      'Create dynamic web applications with React',
      'Develop full-stack applications with Node.js'
    ],
    curriculum: [
      {
        title: 'HTML & CSS Fundamentals',
        lessons: [
          { title: 'Introduction to HTML', duration: '15 min' },
          { title: 'CSS Layouts and Flexbox', duration: '25 min' },
          { title: 'Responsive Design Principles', duration: '20 min' }
        ]
      },
      {
        title: 'JavaScript Mastery',
        lessons: [
          { title: 'Variables and Data Types', duration: '18 min' },
          { title: 'Functions and Scope', duration: '22 min' },
          { title: 'ES6+ Features', duration: '30 min' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native and modern JavaScript.',
    instructor: 'Michael Chen',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 892,
    duration: '38 hours',
    lessons: 142,
    category: 'mobile development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    objectives: [
      'Build native mobile apps for iOS and Android',
      'Master React Native components and navigation',
      'Integrate with backend APIs and databases',
      'Deploy apps to app stores'
    ],
    curriculum: [
      {
        title: 'React Native Basics',
        lessons: [
          { title: 'Setting up React Native', duration: '20 min' },
          { title: 'Components and Props', duration: '25 min' },
          { title: 'State Management', duration: '30 min' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Data Science and Machine Learning',
    description: 'Master Python, statistics, and machine learning algorithms for data analysis.',
    instructor: 'Dr. Emily Rodriguez',
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviews: 2156,
    duration: '52 hours',
    lessons: 203,
    category: 'data science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    objectives: [
      'Analyze data using Python and pandas',
      'Build machine learning models',
      'Visualize data with matplotlib and seaborn',
      'Deploy ML models to production'
    ],
    curriculum: [
      {
        title: 'Python for Data Science',
        lessons: [
          { title: 'Python Basics', duration: '30 min' },
          { title: 'Pandas Data Manipulation', duration: '45 min' },
          { title: 'Data Visualization', duration: '35 min' }
        ]
      }
    ]
  }
];

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      // Check if Firebase is available
      if (!isFirebaseAvailable()) {
        console.log('Firebase not available, using fallback data');
        setCourses(fallbackCourses);
        setLoading(false);
        return;
      }

      const coursesCollection = collection(db, 'courses');
      const coursesSnapshot = await getDocs(coursesCollection);
      const coursesList = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesList);
    } catch (error) {
      console.error('Error fetching courses from Firestore:', error);
      console.log('Using fallback course data for development');
      setCourses(fallbackCourses);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single course
  const fetchCourse = async (courseId) => {
    try {
      // Check if Firebase is available
      if (!isFirebaseAvailable()) {
        return fallbackCourses.find(course => course.id === courseId) || null;
      }

      const courseDoc = await getDoc(doc(db, 'courses', courseId));
      if (courseDoc.exists()) {
        return { id: courseDoc.id, ...courseDoc.data() };
      }
      // Fallback to local data if Firestore fails
      return fallbackCourses.find(course => course.id === courseId) || null;
    } catch (error) {
      console.error('Error fetching course from Firestore:', error);
      // Fallback to local data
      return fallbackCourses.find(course => course.id === courseId) || null;
    }
  };

  // Enroll in course
  const enrollInCourse = async (courseId) => {
    try {
      // Check if Firebase is available
      if (!isFirebaseAvailable()) {
        console.log('Firebase not available, simulating enrollment');
        return true;
      }

      const enrollmentData = {
        courseId,
        enrolledAt: new Date(),
        progress: 0,
        completed: false
      };
      
      await addDoc(collection(db, 'enrollments'), enrollmentData);
      return true;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      // For development, we'll simulate successful enrollment
      console.log('Simulating successful enrollment for development');
      return true;
    }
  };

  // Update course progress
  const updateCourseProgress = async (enrollmentId, progress) => {
    try {
      // Check if Firebase is available
      if (!isFirebaseAvailable()) {
        console.log('Firebase not available, simulating progress update');
        return true;
      }

      await updateDoc(doc(db, 'enrollments', enrollmentId), {
        progress,
        lastUpdated: new Date()
      });
      return true;
    } catch (error) {
      console.error('Error updating course progress:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const value = {
    courses,
    loading,
    fetchCourses,
    fetchCourse,
    enrollInCourse,
    updateCourseProgress
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}
