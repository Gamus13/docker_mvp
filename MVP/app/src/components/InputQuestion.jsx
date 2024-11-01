

import React, { useContext, useRef } from "react";
import { ContextApp } from "../utils/Context";
import { RiSendPlane2Fill, RiAttachmentLine } from "react-icons/ri";
import axios from '../axios';

const InputQuestion = ({ currentChatId, handleSendMessage }) => {
  const {
    chatValue,
    setChatValue,
    handleKeyPress,
  } = useContext(ContextApp);

  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Fichier sélectionné :', file);
    }
  };

  const sendQuestionToBackend = async (message) => {
    try {
      const response = await axios.post(`/chat/${currentChatId}/question`, {
        id: currentChatId,
        question: message,
      });
      console.log('Question sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending question:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (chatValue.trim() === "") {
      console.error("Please enter a message");
      return;
    }
    if (!currentChatId) {
      console.error("No current chat ID available. Cannot send message.");
      return;
    }
    sendQuestionToBackend(chatValue);
    handleSendMessage(chatValue);
    setChatValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center justify-between bg-gray-600 rounded-lg shadow-md w-full max-w-2xl lg:max-w-3xl px-3">
      <RiAttachmentLine
        className="text-white cursor-pointer text-3xl"
        title="Add a file"
        onClick={handleAttachmentClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="text"
        placeholder="Send a message"
        className="h-full text-white bg-transparent px-3 py-4 flex-grow border-none outline-none text-base"
        value={chatValue}
        onChange={(e) => setChatValue(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button
        type="submit"
        className="text-white cursor-pointer text-3xl bg-green-500 p-1 rounded shadow-md"
      >
        <RiSendPlane2Fill title="send message" />
      </button>
    </form>
  );
};

export default InputQuestion;


