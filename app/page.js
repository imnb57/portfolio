"use client";
import React, { useState, useEffect } from 'react';

function HomePage() {
  const [message, setMessage] = useState('');
  const [player, setPlayer] = useState(null);

  const handleClick = (newMessage) => {
    setMessage(newMessage);
  };

  const handleUnmute = () => {
    if (player) {
      player.unMute();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage('');
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [message]);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
          autoplay: 1,
          mute: 1,
        },
        events: {
          onReady: (event) => setPlayer(event.target),
        },
      });
    };
  }, []);

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="w-full bg-black rounded-md py-20 text-white">
        <h1 className="text-2xl font-bold text-center mb-4">Look what curiosity did to you</h1>
        <p className="font-medium text-center mb-4">Don't be clicking random links like this...</p>
        <div className="flex flex-col items-center justify-between">
          <button
            className="bg-gray-100 text-poppins font-bold text-center w-2/3 text-black py-2 px-4 my-2 rounded-md hover:bg-gray-200 active:bg-green-500 active:text-white"
            onClick={() => handleClick('learned your lesson!')}
          >
            I never will!
          </button>
          <button
            className="bg-red-500 text-poppins text-center w-2/3 text-black my-2 rounded-md py-2 px-4"
            onClick={() => handleClick("some people don't change")}
          >
            You'll never know!
          </button>
        </div>
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        <div className="flex items-center flex-col">
          <button
            className="bg-blue-500 text-poppins text-black my-2 w-2/3 rounded-md py-2 px-4"
            onClick={handleUnmute}
          >
            Unmute and Enjoy
          </button>
          <div id="yt-player" className="w-full h-80"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
