

import { createContext, useEffect, useRef, useState } from "react";
import { sendMsgToAI } from "./OpenAi";
import { storeDocument, streamingChat } from "./apiService";

export const ContextApp = createContext();

const AppContext = ({ children }) => {
  // ... autres états et méthodes

    const [showSlide, setShowSlide] = useState(false);
  const [Mobile, setMobile] = useState(false);
  const [isVocalMode, setIsVocalMode] = useState(false);
  const [chatValue, setChatValue] = useState("");
  const [message, setMessage] = useState([
    {
      text: "Hello, my name is Ange, a powerful language model created by Docxtalk. My main function is to provide information, answer questions, offer suggestions and much more. Don't hesitate to ask me anything about your documents or let me know how I can help you today!",
      isBot: true,
    },
  ]);
  const msgEnd = useRef(null);

  const handleToggleVocalMode = () => {
    setIsVocalMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView();
    }
  }, [message]);

  const handleSend = async () => {
    const text = chatValue;
    setChatValue("");
    setMessage((prevMessages) => [...prevMessages, { text, isBot: false }]);
    const res = await sendMsgToAI(text);
    setMessage((prevMessages) => [
      ...prevMessages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const handleStoreDocument = async (formData) => {
    const response = await storeDocument(formData);
    console.log(response);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleQuery = async (e) => {
    const text = e.target.innerText;
    setMessage((prevMessages) => [...prevMessages, { text, isBot: false }]);
    const res = await sendMsgToAI(text);
    setMessage((prevMessages) => [
      ...prevMessages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  const handleStreamingChat = async (id, question) => {
    const response = await streamingChat(id, question);
    console.log(response);
  };

  // const handleSendMessage = async (text, isVoice = false) => {
  //   setMessage((prevMessages) => [...prevMessages, { text, isBot: false }]);

  //   try {
  //     const response = await sendMsgToAI(text);
  //     setMessage((prevMessages) => [
  //       ...prevMessages,
  //       { text, isBot: false },
  //       { text: response, isBot: true },
  //     ]);
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //   }
  // };

  const handleSendMessage = async (text, isVoice = false) => {
    console.log('Sending message:', text); // Ajout de journalisation
    setMessage((prevMessages) => [...prevMessages, { text, isBot: false }]);
  
    try {
      const response = await sendMsgToAI(text);
      console.log('Received response:', response); // Ajout de journalisation
      setMessage((prevMessages) => [
        ...prevMessages,
        { text, isBot: false },
        { text: response, isBot: true },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  return (
    <ContextApp.Provider
      value={{
        showSlide,
        setShowSlide,
        Mobile,
        setMobile,
        chatValue,
        setChatValue,
        isVocalMode,
        handleToggleVocalMode,
        handleSend: () => handleSendMessage(chatValue),
        handleStoreDocument,
        message,
        msgEnd,
        handleKeyPress,
        handleQuery,
        handleStreamingChat,
        handleSendMessage, // Ajout de la méthode
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};


export default AppContext;
