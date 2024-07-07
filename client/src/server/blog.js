import axios from "axios"
axios.defaults.withCredentials = true

const URL = import.meta.env.VITE_APP_URL

export const getBlogs = async() => {
    const response = await axios.get(`${URL}/blogs`);
    return response.data;
}

export const getBlogDetails = async (blogId) => {
    if (!blogId) return;
    const response = await axios.get(`${URL}/blog/${blogId}/details`);
    return response.data;

}

