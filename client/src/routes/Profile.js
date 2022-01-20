import React from 'react';
import { authService } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  return (
    <div>
      <span>Profile</span>
      <button onClick={onLogOutClick}>LogOut</button>
    </div>
  );
};

export default Profile;
