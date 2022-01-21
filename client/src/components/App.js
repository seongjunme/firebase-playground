import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService, onAuthStateChanged } from '../firebase';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setLoading(false);
      setUserObj(user);
    });
  }, []);

  return <div>{loading ? 'loading...' : <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />}</div>;
}

export default App;
