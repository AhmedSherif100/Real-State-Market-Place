import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('winter'); // Default to winter

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'winter'; // Default to winter if no saved theme
    document.documentElement.setAttribute('data-theme', saved);
    setTheme(saved);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === 'winter' ? 'mylight' : 'winter'; // Toggle between winter and mylight
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="btn btn-sm btn-outline absolute top-4 right-4 z-50"
    >
      {theme === 'winter' ? 'Light Mode' : 'Winter Mode'} {/* Update button text */}
    </button>
  );
};

export default ThemeToggle;