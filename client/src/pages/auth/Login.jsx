import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from '../../server/auth';

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: checked || value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return setMessage("Please enter email!");
    if (!formData.password) return setMessage("Please enter password!");
    
    login(formData.email, formData.password, formData.remember)
      .then((data) => {
        setMessage(data.message);
        navigate("/");
      })
      .catch((err) => setMessage(err.message));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {message && <Alert color="info">{message}</Alert>}
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <div className="flex items-center">
              <Checkbox id="remember" name="remember" checked={formData.remember} onChange={handleChange} />
              <Label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me
              </Label>
            </div>
            <div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
