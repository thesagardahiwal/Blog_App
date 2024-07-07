import React, { useState } from 'react'
import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../server/auth';

function Login() {
    const [formData, setFormData] = useState({
        email: "", password: "", remember: false
    });

    const navigate = useNavigate()
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (checked) {
            return setFormData({ ...formData, [name]: checked })
        }
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email) return setMessage(() => "Please enter email!");
        if (!formData.password) return setMessage(() => "Please enter password!");
    
        login(formData.email, formData.password, formData.remember).then((data) => {
            setMessage(() => data.message);
            navigate("/")
        })
        .catch((err) => setMessage(() => err.message))


    };
    return (
        <div className='p-4'>
            {message.length > 0 &&
                <>
                    <Alert color="info">
                        {message}
                    </Alert>
                </>
            }
            <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput id="email1" name='email' value={formData.email} onChange={handleChange} type="email" placeholder="name@flowbite.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput id="password1" name='password' value={formData.password} onChange={handleChange} type="password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" name='remember' onClick={handleChange} value={formData.remember} />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Login