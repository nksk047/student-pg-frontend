import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import Listings from './pages/public/Listings';
import SingleListing from './pages/public/SingleListing';
import StudentDashboard from './pages/student/Dashboard';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import CreateListing from './pages/owner/CreateListing';
import Favorites from './pages/student/Favorites';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';
import OwnerVerification from './pages/owner/OwnerVerification';


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<SingleListing />} />
          <Route path="/owner/add" element={<CreateListing />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/favorites" element={<Favorites />} />
          <Route
  path="/student/dashboard"
  element={
    <ProtectedRoute role="student">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />

<Route
  path="/owner/verify"
  element={
    <ProtectedRoute role="owner">
      <OwnerVerification />
    </ProtectedRoute>
  }
/>


<Route
  path="/owner/dashboard"
  element={
    <ProtectedRoute role="owner">
      <OwnerDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/owner/create-listing"
  element={
    <ProtectedRoute role="owner">
      <CreateListing />
    </ProtectedRoute>
  }
/>



<Route
  path="/student/favorites"
  element={
    <ProtectedRoute role="student">
      <Favorites />
    </ProtectedRoute>
  }
/>


          {/* Owner Routes */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/create-listing" element={<CreateListing />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
