import { Home } from './pages';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import ManageProperties from './pages/ManageProperties';
import ManageUsers from './pages/ManageUsers';
import Properties from './pages/Properties';
import Rent from './pages/Rent';
import Buy from './pages/Buy';
import Sell from './pages/Sell';

import PropertyDetail from './pages/PropertyDetail';
import BecomeAgent from './pages/BecomeAgent';
import Agent from './pages/Agent';
import CreateAgent from './pages/CreateAgent';

import React, { useEffect } from 'react';
import './App.css';
import { themeChange } from 'theme-change';
import initializeApp from './app/admin-dashboard/init';
import Layout from './containers/admin-dashboard/Layout';
// // Importing pages
// const Layout = lazy(() => import('./containers/admin-dashboard/Layout'));

// Initializing different libraries
initializeApp();

const App = () => {
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-base-100 transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage-properties" element={<ManageProperties />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/bagent" element={<BecomeAgent />} />
        <Route path="/create-agent" element={<CreateAgent />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/admin/*" element={<Layout />} />
      </Routes>
    </div>
  );
};

export default App;
