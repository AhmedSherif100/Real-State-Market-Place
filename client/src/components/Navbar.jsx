import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <h1 className="text-xl font-bold dark:text-white">Admin Dashboard</h1>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
