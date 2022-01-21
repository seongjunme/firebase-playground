import React, { useEffect, useState, useRef } from 'react';
import Tweet from '../components/Tweet';
import { dbService, collection, addDoc, onSnapshot, query, orderBy } from '../firebase';
import { storageService, ref, uploadString, getDownloadURL } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attachment, setAttachment] = useState('');
  const attachmentRef = useRef();

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setTweet(value);
  };

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearFile = () => {
    setAttachment('');
    attachmentRef.current.value = '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const attachmentURL = await (async () => {
        if (attachment) {
          const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(fileRef, attachment, 'data_url');
          const url = await getDownloadURL(response.ref);
          return url;
        } else {
          return '';
        }
      })();

      await addDoc(collection(dbService, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentURL,
      });
      setTweet('');
      onClearFile();
    } catch (error) {
      console.log(error);
    }
  };

  const getTweets = async () => {
    onSnapshot(query(collection(dbService, 'tweets'), orderBy('createdAt', 'desc')), (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
        <input type="file" accept="image/*" ref={attachmentRef} onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {attachment && (
          <div>
            <img alt="attachment" src={attachment} width="50px" height="50px" />
            <button onClick={onClearFile}>Clear</button>
          </div>
        )}
      </form>
      {loading ? (
        <div>Tweet Loading...</div>
      ) : (
        tweets.map((el, i) => <Tweet key={i} tweetObj={el} isOwner={el.creatorId === userObj.uid} />)
      )}
    </div>
  );
};

export default Home;
