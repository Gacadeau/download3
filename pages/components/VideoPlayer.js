// components/VideoPlayer.js

import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="my-4">
      <video controls width="640" height="360" className='h-[350px]'>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
