import React, { useEffect } from 'react';
import { authService, dbService, getDocs, query, where, collection } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userObj }) => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  const getMyTweets = async () => {
    const querySnapShot = await getDocs(
      query(collection(dbService, 'tweets'), where('creatorId', '==', userObj.uid))
    );
    querySnapShot.forEach((doc) => doc.data());
  };

  useEffect(() => {
    getMyTweets();
  });

  return (
    <div>
      <span>Profile</span>
      <button onClick={onLogOutClick}>LogOut</button>
    </div>
  );
};

export default Profile;
