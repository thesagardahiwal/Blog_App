import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../server/auth'; // Adjust the import path as needed
import { Avatar } from 'flowbite-react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await axios.get(`${import.meta.env.VITE_APP_URL}/user-profile/${id}`);
        const loggedInUser = await isLoggedIn();
        setUserData(userResponse.data.userDetails);
        setBlogs(userResponse.data.blogs);
        setCurrentUser(loggedInUser);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfileData();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        {userData && (
          <>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-32 h-32" placeholderInitials={userData.username.charAt(0)} rounded />
              <h1 className="text-3xl font-bold mt-4">{userData.username}</h1>
              <p className="text-gray-600">{userData.email}</p>
              {currentUser?._id === userData?._id && (
                <button
                  onClick={() => navigate(`/edit-profile/${userData?._id}`)}
                  className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
            <div className="border-t border-gray-300 mt-6">
              <div className="flex justify-around mt-6">
                <div className="text-center">
                  <span className="block text-xl font-bold">{blogs.length}</span>
                  <span className="text-gray-600">Posts</span>
                </div>
                {/* Add followers and following count if needed */}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div key={blog._id} className="border rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    <p className="text-gray-700 truncate">{blog.content}</p>
                    {currentUser?._id === userData?._id && (
                      <button
                        onClick={() => navigate(`/edit-blog/${blog._id}`)}
                        className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded-md"
                      >
                        Edit Blog
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No blogs available</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
