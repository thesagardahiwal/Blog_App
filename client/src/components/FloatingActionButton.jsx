import React, { useEffect, useState } from 'react';
import { FaPlus, FaPen, FaUser, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../server/auth';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    isLoggedIn()
        .then((data) => setCurrentUser(data));
  }, [open])

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center space-y-2">
      {isOpen && (
        <div className="flex flex-col items-center space-y-2 mb-4">
          <Link to="/create-blog" className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
            <FaPen />
          </Link>
          <Link to={`/user-profile/${currentUser?._id}`} className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600">
            <FaUser />
          </Link>
          {/* <Link to="/likes" className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600">
            <FaHeart />
          </Link> */}
        </div>
      )}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-14 h-14 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 focus:outline-none"
      >
        <FaPlus className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
      </button>
    </div>
  );
};

export default FloatingActionButton;
