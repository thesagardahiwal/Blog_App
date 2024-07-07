import { Carousel } from 'flowbite-react'
import { Card } from "flowbite-react";
import React, { useCallback, useEffect, useState } from 'react'
import { getBlogs } from '../server/blog';
import { useNavigate } from 'react-router-dom';

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

            <div className='font-semibold pt-3 sm:font-bold text-xl'>
                Blogs
            </div>
            <div className='flex flex-wrap mb-4 gap-1 items-center'>
                {blogs && blogs.length > 0 && blogs.map((blog, i) => (
                    <div key={i} className='m-2 sm:m-0'>
                        <Card 
                        onClick={() => handleBlog(blog)}
                        className="max-w-lg md:h-[230px]" imgSrc={blog.media} horizontal>
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {blog.title}
                            </h5>
                            <p className="font-normal text-ellipsis text-gray-700 dark:text-gray-400">
                                {blog.content}
                            </p>
                        </Card>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home