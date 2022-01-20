import React, { Profiler } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import SignUp from '../routes/SignUp';
import Profile from '../routes/Profile';
import NotFound from '../routes/NotFound';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
