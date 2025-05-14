import { Home } from './pages';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './pages/Dashboard';
import ManageProperties from './pages/ManageProperties';
import ManageUsers from './pages/ManageUsers';
import ThemeToggle from './components/ThemeToggle';
import Youssef from './pages/Youssef';
import Properties from './pages/Properties';
const App = () => {
  return (
    <div className="relative min-h-screen bg-base-100 transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-properties" element={<ManageProperties />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/ThemeToggle" element={<ThemeToggle />} />
        <Route path="/youssef" element={<Youssef />} />
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </div>
  );
};

export default App;
