import { Home, Register } from './pages'; // Import HomePage
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
