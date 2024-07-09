import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getBlogDetails } from '../server/blog';
import { Alert, Avatar } from 'flowbite-react';
import moment from 'moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

function BlogDetails() {
    const [currentBlog, setCurrentBlog] = useState(null);
    const { blogId } = useParams();
    const [message, setMessage] = useState("");


    const handleBlog = useCallback((data) => {
        if (data.message) {
            return setMessage(() => data.message);
        }
        console.log(data)
        setCurrentBlog(() => data);

    }, [])

    useEffect(() => {
        getBlogDetails(blogId)
            .then(handleBlog)
            .catch((err) => console.log(err))
    }, [])
    return (
        <div className='p-4'>
            {message.length > 0 &&
                <Alert color="info">
                    {message}
                </Alert>
            }
            <Link
                to={"/"}
                className='p-2 m-2 bg-cyan-300 font-light text-sm rounded-lg'
            >
                <KeyboardBackspaceRoundedIcon /> Go Back
            </Link>
            <div>
                {currentBlog && (
                    <div className='p-2 sm:px-10'>
                        <div>
                            <h3 className='text-xl dark:text-white font-bold'>{currentBlog.title}</h3>
                        </div>
                        <div className='h-[200px] flex justify-center my-2 p-2 sm:h-[300px] overflow-hidden rounded-sm'>
                            <img src={currentBlog.media} className='sm:h-full w-full flex rounded-sm object-cover' alt="" />
                        </div>
                        <div className='border-y-2 p-1 flex justify-between items-center'>
                            <div className='flex items-center'>
                                <div>
                                    <div className='w-10 h-10 flex rounded-full bg-slate-400'>
                                        <Avatar placeholderInitials={currentBlog.author?.username.charAt(0)} rounded />
                                    </div>
                                </div>
                                <div className=''>
                                    <p className='text-[15px]'>@{currentBlog.author?.username}</p>
                                    <p className='text-[10px] !m-0 !p-0'>{moment(currentBlog.updatedAt).fromNow()}</p>
                                </div>
                            </div>
                            <div className='flex gap-2 px-1'>
                                <span><FavoriteBorderIcon /></span>
                                <span><PersonAddAlt1RoundedIcon /></span>
                            </div>
                        </div>
                        <div className='px-4'>
                            <p className='text-slate-700 dark:bg-slate-300'>{currentBlog.content}</p>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}

export default BlogDetails