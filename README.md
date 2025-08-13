# Turro - Online Course Platform

A modern, responsive online course selling platform built with React, Firebase, and deployed on Vercel. Features a clean, Vercel-inspired aesthetic with smooth animations and comprehensive functionality.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design inspired by Vercel's aesthetic
- **Firebase Integration**: Authentication, Firestore database, and file storage
- **React Router**: Client-side routing with protected routes
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Course Management**: Browse, enroll, and track course progress
- **User Authentication**: Sign up, login, and user profile management
- **Real-time Updates**: Live course progress and enrollment tracking

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: CSS3 with custom animations
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Vercel
- **Font**: Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd turro-course-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Enable Storage
   - Get your Firebase configuration

4. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. **Start development server**
   ```bash
   npm start
   ```

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add the Firebase environment variables

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting provider

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation component
│   ├── CourseCard.js   # Course display component
│   └── Footer.js       # Footer component
├── contexts/           # React Context providers
│   ├── AuthContext.js  # Authentication state management
│   └── CourseContext.js # Course data management
├── firebase/           # Firebase configuration
│   └── config.js       # Firebase setup
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Login.js        # Authentication pages
│   ├── Register.js     # User registration
│   ├── Courses.js      # Course listing
│   └── Dashboard.js    # User dashboard
├── styles/             # CSS files
├── App.js              # Main app component
└── index.js            # Entry point
```

## 🔧 Firebase Setup

### Authentication
- Enable Email/Password authentication
- Set up user profile creation in Firestore

### Firestore Database
Create the following collections:
- `users`: User profiles and preferences
- `courses`: Course information and metadata
- `enrollments`: User course enrollments and progress

### Storage
- Set up rules for course content and user uploads
- Configure CORS for image hosting

## 🎨 Customization

### Colors
The primary color scheme uses a gradient from `#667eea` to `#764ba2`. You can customize this in:
- `src/App.css`
- `src/components/Navbar.css`
- Component-specific CSS files

### Fonts
The app uses Inter font family. You can change this in:
- `public/index.html`
- CSS font-family declarations

### Animations
Framer Motion animations can be customized in:
- Component files with motion components
- CSS transitions and transforms

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Mobile**: 480px and below
- **Tablet**: 768px and below
- **Desktop**: 1200px and above

## 🔒 Security

- Firebase Authentication for user management
- Firestore security rules for data protection
- Environment variables for sensitive configuration
- Input validation and sanitization

## 🚀 Performance

- Code splitting with React Router
- Optimized images and assets
- Lazy loading for better performance
- Efficient state management with Context API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Vercel's clean aesthetic
- Firebase for backend services
- React community for excellent documentation
- Framer Motion for smooth animations

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using React, Firebase, and Vercel**
