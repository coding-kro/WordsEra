import React from 'react';
import logo from '@/assets/hero.png';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { RiLoginBoxFill } from 'react-icons/ri';
import SearchBox from './SearchBox';
import { RouteIndex, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import usericon from '@/assets/images/user.png';
import { FaUser } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { IoLogOutSharp } from 'react-icons/io5';
import { showToast } from '@/helpers/showToast';
import { removeUser } from '@/redux/user/user.slice';

const Topbar = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'get',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message);
      }

      dispatch(removeUser());

      navigate(RouteIndex);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message);
    }
  };

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
        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <RiLoginBoxFill />
              Sign in
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user.user.avatar || usericon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <p>{user.user.username}</p>
                  <p>{user.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="">
                    <FaUser />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="">
                    <IoMdAdd />
                    Create Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <IoLogOutSharp color="red" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
