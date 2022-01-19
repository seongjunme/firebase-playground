import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import SignUp from '../routes/SignUp';
import NotFound from '../routes/NotFound';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />} />
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
