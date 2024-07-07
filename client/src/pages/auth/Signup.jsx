import React, { useEffect, useState } from 'react'
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { register } from '../../server/auth';


function Signup() {
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", password2: "", checkbox: false
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
        if (!formData.checkbox) return setMessage(() => "Please accept terms and conditions");
        if (!formData.username) return setMessage(() => "Please enter valid username");
        if (formData.password != formData.password2) return setMessage(() => "Password does not match!");
        if (!formData.email) return setMessage(() => "Enter valid email eg. abc@email.com");
        register(formData.username, formData.email, formData.password)
            .then((data) => {
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
                        <Label htmlFor="username2" value="Your username" />
                    </div>
                    <TextInput id="username2" type="text" name='username' value={formData.username} onChange={handleChange} placeholder="username" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput id="email2" type="email" name='email' value={formData.email} onChange={handleChange} placeholder="name@email.com" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput id="password2" type="password" name='password' value={formData.password} onChange={handleChange} required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                    </div>
                    <TextInput id="repeat-password" type="password" name='password2' value={formData.password2} onChange={handleChange} required shadow />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" name='checkbox' onClick={handleChange} checked={formData.agree} />
                    <Label htmlFor="agree" className="flex">
                        I agree with the&nbsp;
                        <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                            terms and conditions
                        </Link>
                    </Label>
                </div>
                <Button type="submit">Register new account</Button>
            </form>

            <div className='mt-2 text-sm p-2'>
                Already have an account ? &nbsp;
                <Link to="/login" className='text-cyan-600 hover:underline dark:text-cyan-500'>
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Signup