import React, { useState } from 'react';
import { dbService, doc, deleteDoc, updateDoc } from '../firebase';

const Tweet = ({ tweetObj: { id, tweet }, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState('');

  const onDeleteClick = () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?');
    if (ok) {
      const docRef = doc(dbService, `tweets/${id}`);
      deleteDoc(docRef);
    }
  };

  const toggleEditStatus = () => setEditing((prev) => !prev);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const docRef = doc(dbService, `tweets/${id}`);
    updateDoc(docRef, {
      tweet: newTweet,
    });

    setEditing(false);
    setNewTweet('');
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit your Tweet" value={newTweet} onChange={onChange} required />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditStatus}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweet}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditStatus}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
