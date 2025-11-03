import React from 'react';

function Navbar({ isLoggedIn, setIsLoggedIn, setPasswords }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setPasswords([]);
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Password Manager</div>
      {isLoggedIn && (
        <div>
          <button
            onClick={handleLogout}
            className="bg-[#F97316] text-white py-1 px-4 rounded-full font-semibold"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;