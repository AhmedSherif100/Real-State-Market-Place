import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Properties from './pages/admin/Properties';
import Settings from './pages/admin/Settings';
import { Home } from './pages';
import Register from './components/Register';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Rent from './pages/Rent';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import PropertyDetail from './pages/PropertyDetail';
import Agent from './pages/Agent';
import BecomeAgent from './pages/BecomeAgent';
import CreateAgent from './pages/CreateAgent';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="properties" element={<Properties />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/bagent" element={<BecomeAgent />} />
        <Route path="/create-agent" element={<CreateAgent />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
