import React from 'react';

const Tweet = ({ tweetObj: { tweet } }) => {
  return (
    <div>
      <h4>{tweet}</h4>
    </div>
  );
};

export default Tweet;
