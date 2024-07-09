import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogDetails } from '../server/blog'; 

const EditBlog = () => {
  const { blogId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media: null,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const data = await getBlogDetails(blogId);
      if (data) {
        setFormData({ title: data.title, content: data.content, media: null });
      } else {
        setMessage('Failed to fetch blog details');
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, media } = formData;

    if (!title || !content) {
      return setMessage('Title and content are required');
    }

    const formDataObj = new FormData();
    formDataObj.append('title', title);
    formDataObj.append('content', content);
    if (media) {
      formDataObj.append('media', media);
    }

    try {
      await axios.post(`${import.meta.env.VITE_APP_URL}/blog/${blogId}/update`, formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (error) {
      setMessage('Failed to update blog. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
        {message && <div className="text-red-500 mb-4">{message}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="media">
            Media
          </label>
          <input
            type="file"
            name="media"
            id="media"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
