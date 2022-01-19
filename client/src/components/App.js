import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import { authService, onAuthStateChanged } from '../firebase';

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setLoading(false);
    });
  }, []);

  return <div>{loading ? 'loading...' : <AppRouter isLoggedIn={isLoggedIn} />}</div>;
}

export default App;
