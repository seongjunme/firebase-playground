import React, { useState } from 'react';
import { dbService, collection, addDoc } from '../firebase';

const Home = () => {
  const [tweet, setTweet] = useState('');

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, 'tweets'), {
        tweet,
        createAt: Date.now(),
      });
      setTweet('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="tweet" />
      </form>
    </div>
  );
};

export default Home;
