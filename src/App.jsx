import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const UploadPage = lazy(() => import('./pages/UploadPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const MemeDetailsPage = lazy(() => import('./pages/MemeDetailsPage'));

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-5">
              <div className="absolute w-full h-full bg-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1531425300797-d5dc8b021c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80')", backgroundSize: "100px" }}></div>
            </div>
            <Navbar />
            <main className="flex-grow relative z-10" role="main">
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/meme/:id" element={<MemeDetailsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
