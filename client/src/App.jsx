import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import Register from './components/Register';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './pages/Dashboard';
import ManageProperties from './pages/ManageProperties';
import ManageUsers from './pages/ManageUsers';
import Properties from './pages/Properties';
import Rent from './pages/Rent';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import PropertyDetail from './pages/PropertyDetail';
import Agent from './pages/Agent';
import BecomeAgent from './pages/BecomeAgent';
import CreateAgent from './pages/CreateAgent';
import ManageAgents from './pages/ManageAgents';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import ReviewForm from './components/ReviewForm';

const App = () => {
  return (
    <div className="relative min-h-screen bg-base-100 transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/manage-properties" element={<ManageProperties />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-agents" element={<ManageAgents />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/agent" element={<Agent/>} />
        <Route path="/bagent" element={<BecomeAgent />} />
        <Route path="/create-agent" element={<CreateAgent />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/write-review" element={<ReviewForm />} />
      </Routes>
    </div>
  );
};

export default App;
