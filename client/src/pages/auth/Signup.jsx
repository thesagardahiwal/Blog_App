import React, { useState } from 'react';
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { register } from '../../server/auth';

function Signup() {
  const [formData, setFormData] = useState({
    username: "", email: "", password: "", password2: "", checkbox: false
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: checked || value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.checkbox) return setMessage("Please accept terms and conditions");
    if (!formData.username) return setMessage("Please enter valid username");
    if (formData.password !== formData.password2) return setMessage("Passwords do not match!");
    if (!formData.email) return setMessage("Enter a valid email eg. abc@email.com");
    
    register(formData.username, formData.email, formData.password)
      .then((data) => {
        setMessage(data.message);
        navigate("/");
      })
      .catch((err) => setMessage(err.message));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && <Alert color="info">{message}</Alert>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</Label>
              <TextInput
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
              <TextInput
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirm Password</Label>
              <TextInput
                id="password2"
                name="password2"
                type="password"
                value={formData.password2}
                onChange={handleChange}
                required
                className="mt-1 block w-full"
              />
            </div>
            <div className="flex items-center">
              <Checkbox id="checkbox" name="checkbox" checked={formData.checkbox} onChange={handleChange} />
              <Label htmlFor="checkbox" className="ml-2 block text-sm text-gray-900">
                I agree to the{" "}
                <Link to="#" className="text-indigo-600 hover:text-indigo-500">
                  terms and conditions
                </Link>
              </Label>
            </div>
            <div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
