
import React, { useContext } from 'react';
import { ContextApp } from '../utils/Context';
import ChatResponse from './ChatResponse';
import Avatar from 'react-avatar';

function Chat() {
  const { message, msgEnd, isVocalMode } = useContext(ContextApp);

  return (
    <div className="w-full h-[85%] flex items-center justify-center overflow-hidden overflow-y-auto px-2 py-1 scroll">
      <div className="w-full lg:w-4/5 flex flex-col h-full items-start justify-start">
   
        {message?.map((msg, i) => (
          <div key={i} className="w-full flex flex-col">
            <div
              className={
                msg.isBot
                  ? 'flex items-start justify-start gap-2 lg:gap-5 my-2 bg-gray-800/80 p-3 rounded-md'
                  : 'flex items-start justify-start gap-2 lg:gap-5 my-2 p-3'
              }
            >
              <Avatar
                src={msg.isBot ? '/icon.png' : '/user.jpeg'}
                alt="user"
                className="w-10 h-10 rounded object-cover"
                size={50}
              />
              <p className="text-white text-[15px]">{msg?.text}</p>
            </div>
            {!msg.isBot && (
              <div className="flex justify-end mt-6 w-full">
                <div className="w-1/2">
                  <ChatResponse isVocalMode={isVocalMode} />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={msgEnd} />
      </div>
    </div>
  );
}

export default Chat;

