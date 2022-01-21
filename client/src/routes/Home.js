import React, { useEffect, useState } from 'react';
import { dbService, collection, addDoc, getDocs } from '../firebase';

const Home = () => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getTweets = async () => {
    const datas = [];
    const results = await getDocs(collection(dbService, 'tweets'));
    results.forEach((doc) => datas.push(doc.data()));
    setTweets(datas);
  };

  useEffect(() => {
    getTweets();
    setLoading(false);
  }, []);

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
      {loading ? <div>Tweet Loading...</div> : tweets.map((el, i) => <div key={i}>{el.tweet}</div>)}
    </div>
  );
};

export default Home;
