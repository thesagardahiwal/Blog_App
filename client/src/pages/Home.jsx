import { Avatar, Carousel } from 'flowbite-react'
import { Card } from "flowbite-react";
import React, { useCallback, useEffect, useState } from 'react'
import { getBlogs } from '../server/blog';
import { Link, useNavigate } from 'react-router-dom';

const img = "https://cdn.pixabay.com/photo/2024/03/04/16/38/cat-8612685_1280.jpg"
const img2 = "https://cdn.pixabay.com/photo/2024/03/25/20/30/german-shorthaired-pointer-8655457_1280.jpg"
function Home() {
    const [blogs, setBlogs] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const content = [
        { image: "https://cdn.pixabay.com/photo/2019/12/31/16/06/yoga-4732209_1280.jpg" },
        { image: "https://cdn.pixabay.com/photo/2023/12/26/02/21/bird-8469368_1280.jpg" },
        { image: "https://cdn.pixabay.com/photo/2020/02/03/00/12/fiber-4814456_1280.jpg" },
        { image: "https://cdn.pixabay.com/photo/2023/11/03/11/40/technology-8362813_1280.jpg" },
    ]

    const handleBlogs = useCallback((data) => {
        console.log(data)
        setBlogs(() => data.result);
        console.log(blogs)
    }, []);

    const handleBlog = (blog) => {
        if (!blog) return;
        navigate(`/${blog._id}/details`);
    }

    const handleError = useCallback((data) => {
        setError(() => data);
    }, [])

    useEffect(() => {
        getBlogs()
            .then(handleBlogs)
            .catch(handleError)
    }, [])
    return (
        <div className='p-2 min-h-[100vh] overflow-scroll'>
            <div className='h-80 sm:h-64 xl:h-[500px] 2xl:h-[653px]'>
                <Carousel>
                    {content.map((el, i) => (
                        <img key={i} src={el.image} className='object-cover h-full rounded-md' />
                    ))}
                </Carousel>
            </div>

            <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Recent Blogs</h2>
        <p className="mt-4 text-lg text-gray-500">
          Discover the latest blogs from our community.
        </p>
        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {blogs?.map((blog, index) => (
            <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={blog.media} alt={blog.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href="#" className="hover:underline">Blog</a>
                  </p>
                  <Link to={`/${blog._id}/details`} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                    <p className="mt-3 text-base text-gray-500">{blog.content.substring(0, 100)}...</p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={`/user-profile/${blog.author?._id}`}>
                      <span className="sr-only">Author</span>
                      <Avatar placeholderInitials={blog.author?.username.charAt(0)} rounded />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={`/user-profile/${blog.author?._id}`} className="hover:underline">{blog.author.username}</a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={blog.createdAt}>{new Date(blog.createdAt).toDateString()}</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

        </div>
    )
}

export default Home