import React, { useEffect, useState } from 'react'
import { Avatar, Button, Navbar } from "flowbite-react";
import { NavLink } from 'react-router-dom';
import { Dropdown } from "flowbite-react";
import { isLoggedIn, logout } from '../../server/auth';

function Nav() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    isLoggedIn().then((data) => setUserData(data))
      .catch((err) => setUserData(null))
      console.log(userData)
  }, [])
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Blog Bloger</span>
      </Navbar.Brand>
      <div className="flex gap-1 md:order-2">
        {!userData ?
          <Button href='/signup'>Get started</Button>
          :
          <>
            <Dropdown label="" renderTrigger={() => <span><Avatar className='cursor-pointer' placeholderInitials={userData.username.charAt(0)} rounded /> </span>} dismissOnClick={false} placement="bottom">
              <Dropdown.Header>
                <span className="block text-sm">{userData.username}</span>
                <span className="block truncate text-sm font-medium">{userData.email}</span>
              </Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => logout().then(() => setUserData(null))}>Sign out</Dropdown.Item>
            </Dropdown>
          </>
        }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/">
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/services">Services</Navbar.Link>
        <Navbar.Link href="/pricing">Pricing</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Nav