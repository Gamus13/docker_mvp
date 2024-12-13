import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Circles } from 'react-loader-spinner';
import Avatar from 'react-avatar';
import { FaPlay, FaPause } from 'react-icons/fa';

function ChatResponse({ isVocalMode }) {
  const [loading, setLoading] = useState(true);
  const [chatResponse, setChatResponse] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(true);
  const [audio, setAudio] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   const fetchChatResponse = async () => {
  //     try {
  //       const response = await axios.get('/most-recent-chat');
  //       console.log('Chat response:', response.data);
  //       setChatResponse(response.data);

  //       if (response.data.audio_path) {
  //         const audioUrl = `http://localhost:8000/${response.data.audio_path}`;
  //         const audioElement = new Audio(audioUrl);
  //         setAudio(audioElement);

  //         audioElement.onended = () => {
  //           setIsPlaying(false);
  //           setAudioLoading(true);
  //         };

  //         audioElement.oncanplaythrough = () => {
  //           setAudioLoading(false);
  //           setDuration(audioElement.duration);
  //         };

  //         audioElement.ontimeupdate = () => {
  //           setCurrentTime(audioElement.currentTime);
  //         };
  //       }
  //     } catch (error) {
  //       console.error('Error fetching chat response:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchChatResponse();
  // }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (loading) {
    return (
      <Circles height="50" width="50" color="#ffffff" ariaLabel="loading" />
    );
  }

  return (
    <div className="flex items-start gap-3 my-2 p-3 bg-gray-800 rounded-md md:mb-6">
      <Avatar
        src="/icon.png"
        alt="bot"
        className="rounded object-cover"
        size={30}
      />
      {isVocalMode && audio ? (
        <div className="relative flex-1 bg-gray-700 p-2 rounded-lg w-full">
          <div className="flex items-center gap-2">
            <button className="text-white" onClick={handlePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div className="flex-1 flex items-center gap-2">
              <span className="text-white ml-2">
                {formatTime(currentTime)}
              </span>
              <span className="text-white mx-1">/</span>
              <span className="text-white mr-2">
                {formatTime(duration)}
              </span>
              {audioLoading && isPlaying ? (
                <div className="ml-2">
                  <Circles height="20" width="20" color="#ffffff" ariaLabel="loading" />
                </div>
              ) : (
                <div className="w-full bg-gray-600 h-2 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 bg-gray-400 h-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-[15px]">{chatResponse?.answer}</p>
      )}
    </div>
  );
}

export default ChatResponse;


