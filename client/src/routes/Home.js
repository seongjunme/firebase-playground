import React, { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import { dbService, collection, addDoc, onSnapshot, query, orderBy } from '../firebase';

const Home = ({ userObj }) => {
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
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setTweet('');
    } catch (error) {
      console.log(error);
    }
  };

  const getTweets = async () => {
    onSnapshot(query(collection(dbService, 'tweets'), orderBy('createdAt', 'desc')), (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => doc.data());
      setTweets(tweetArr);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTweets();
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
      {loading ? <div>Tweet Loading...</div> : tweets.map((el, i) => <Tweet key={i} tweetObj={el} />)}
    </div>
  );
};

export default Home;
