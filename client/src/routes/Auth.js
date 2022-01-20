import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '../firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        throw Error;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(authService, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const onSocialClick = async (e) => {
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        ></input>
        <input type="submit" value="LogIn"></input>
        {error}
      </form>
      <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <button name="Google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
