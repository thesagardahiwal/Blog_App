import React from 'react';

const About = () => {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Our Blog Platform
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A place where you can share your thoughts, read interesting blogs, and connect with others.
          </p>
        </div>

        <div className="mt-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:leading-none">
                Our Mission
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                We aim to create a community where everyone can share their stories, knowledge, and experiences through blogs. Our platform is designed to be user-friendly, allowing you to easily create and share content.
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <img className="w-full rounded-lg shadow-lg" src="https://cdn.pixabay.com/photo/2023/12/26/02/21/bird-8469368_1280.jpg" alt="Our Mission" />
            </div>
          </div>

          <div className="mt-10 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:leading-none">
                Join Our Community
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                By creating an account, you can follow other users, comment on their blogs, and engage with the community. We believe in the power of sharing and collaboration.
              </p>
            </div>
            <div className="mt-10 max-h-[500px] rounded-lg overflow-hidden lg:mt-0 lg:col-start-1">
              <img className="w-full h-fit rounded-lg shadow-lg" src="https://cdn.pixabay.com/photo/2024/03/25/20/30/german-shorthaired-pointer-8655457_1280.jpg" alt="Join Our Community" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
