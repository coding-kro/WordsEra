import React from 'react';
import logo from '@/assets/hero.png';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { RiLoginBoxFill } from 'react-icons/ri';
import SearchBox from './SearchBox';
import { RouteSignIn } from '@/helpers/RouteName';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div>
        <img
          src={logo}
          style={{ width: '120px', height: '20px', objectFit: 'fill' }}
          alt="Logo"
        />
      </div>
      <div className="w-125">
        <SearchBox />
      </div>
      <div>
        <Button asChild className="rounded-full">
          <Link to={RouteSignIn}>
            <RiLoginBoxFill />
            Sign in
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
