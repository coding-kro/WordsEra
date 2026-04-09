import React from 'react';
import { Button } from './ui/button';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { showToast } from '@/helpers/showToast';
import { useNavigate } from 'react-router-dom';
import { RouteIndex } from '@/helpers/RouteName';

const GoogleLogin = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
      const bodyData = {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await fetch(`${API_URL}/auth/google-login`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast('error', data.message);
      }
      navigate(RouteIndex);
      showToast('success', data.message);
    } catch (error) {
      showToast('error', error.message);
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle />
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
