import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="max-w-lg mx-auto lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-lg text-gray-500">
            We'd love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          <dl className="mt-8 text-base text-gray-500">
            <div className="mt-6">
              <dt className="sr-only">Phone number</dt>
              <dd className="flex">
                <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l4-4m0 0l4 4m-4-4v12m4-4h8m-8 0h-4" />
                </svg>
                <span className="ml-3">+1 (555) 123-4567</span>
              </dd>
            </div>
            <div className="mt-3">
              <dt className="sr-only">Email</dt>
              <dd className="flex">
                <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A12.94 12.94 0 0112.21 3H12c-1.1 0-2 .9-2 2v.79c0 .45-.54.67-.85.35L5.12 3.12a1 1 0 00-1.41 0L2.12 4.71c-.39.39-.39 1.02 0 1.41l3.54 3.54c.32.32.1.85-.36.85H3c-1.1 0-2 .9-2 2v.21c0 7.5 6 13.5 13.5 13.5h.21c1.1 0 2-.9 2-2v-1.79c0-.45.54-.67.85-.35l3.54 3.54c.39.39 1.02.39 1.41 0l1.59-1.59c.39-.39.39-1.02 0-1.41l-3.54-3.54c-.32-.32-.1-.85.36-.85H21c1.1 0 2-.9 2-2v-.21a12.94 12.94 0 01-12-12zm-9 5h.01" />
                </svg>
                <span className="ml-3">support@blogplatform.com</span>
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-12 lg:mt-0 lg:col-span-1">
          <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
              <div className="mt-1">
                <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
              <div className="mt-1">
                <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input type="email" name="email" id="email" autoComplete="email" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="mt-1">
                <input type="text" name="phone" id="phone" autoComplete="tel" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <div className="mt-1">
                <textarea id="message" name="message" rows="4" className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"></textarea>
              </div>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
