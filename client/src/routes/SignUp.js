import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, createUserWithEmailAndPassword } from '../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'password2':
        setPassword2(value);
        break;
      default:
        throw Error;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError('패스워드가 일치하지 않습니다.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(authService, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
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
        <input
          name="password2"
          type="password"
          placeholder="Password"
          required
          value={password2}
          onChange={onChange}
        ></input>
        <input type="submit" value="SignUp"></input>
        {error}
      </form>
    </div>
  );
};

export default SignUp;
