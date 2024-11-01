// import React, { useState, useContext, useEffect, useRef } from "react";
// import { RiMicFill } from "react-icons/ri";
// import { ContextApp } from "../utils/Context";
// import axios from '../axios';

// const MicQuestion = ({ currentChatId, handleSendMessage }) => {

//     const {
//         chatValue,
//         setChatValue,
//         handleKeyPress,
//     } = useContext(ContextApp);

//   const [isRecording, setIsRecording] = useState(false);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = 'fr-FR';
//       recognition.interimResults = false;
//       recognition.continuous = false;

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         console.log('Transcript:', transcript);
//         sendQuestionToBackend(transcript);
//         setIsRecording(false);
//       };

//       recognition.onerror = (event) => {
//         console.error('Recognition error:', event.error);
//         setIsRecording(false);
//       };

//       recognitionRef.current = recognition;
//     } else {
//       console.warn('Speech recognition is not supported in this browser.');
//     }
//   }, []);

//   const sendQuestionToBackend = async (message) => {
//     try {
//       const response = await axios.post(`/chat/${currentChatId}/question`, {
//         id: currentChatId, // Inclure l'ID du chat
//         question: message,
//       });
//       console.log('Question sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error sending question:', error);
//     }
//   };

//   const handleMicClick = () => {
//     if (isRecording) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//       console.log('Recording stopped');
//     } else {
//       recognitionRef.current.start();
//       setIsRecording(true);
//       console.log('Recording started');
//     }
//   };

//   return (
//     <RiMicFill
//       className={`text-white cursor-pointer mx-3 text-3xl ${isRecording ? 'text-red-500' : ''}`}
//       title={isRecording ? "Stop recording" : "Start recording"}
//       onClick={handleMicClick}
//     />
//   );
// };

// export default MicQuestion;

// import React, { useState, useContext, useEffect, useRef } from "react";
// import { RiMicFill } from "react-icons/ri";
// import { ContextApp } from "../utils/Context";
// import axios from '../axios';

// const MicQuestion = ({ currentChatId }) => {
//   const {
//     handleSendMessage, // Assurez-vous que handleSendMessage est dans le contexte
//   } = useContext(ContextApp);

//   const [isRecording, setIsRecording] = useState(false);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = 'fr-FR';
//       recognition.interimResults = false;
//       recognition.continuous = false;

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         console.log('Transcript:', transcript);
//         handleSendMessage(transcript); // Utilisez handleSendMessage ici
//         setIsRecording(false);
//       };

//       recognition.onerror = (event) => {
//         console.error('Recognition error:', event.error);
//         setIsRecording(false);
//       };

//       recognitionRef.current = recognition;
//     } else {
//       console.warn('Speech recognition is not supported in this browser.');
//     }
//   }, [handleSendMessage]);

//   const sendQuestionToBackend = async (message) => {
//     try {
//       const response = await axios.post(`/chat/${currentChatId}/question`, {
//         id: currentChatId, // Inclure l'ID du chat
//         question: message,
//       });
//       console.log('Question sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error sending question:', error);
//     }
//   };

//   const handleMicClick = () => {
//     if (isRecording) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//       console.log('Recording stopped');
//     } else {
//       recognitionRef.current.start();
//       setIsRecording(true);
//       console.log('Recording started');
//     }
//   };

//   return (
//     <RiMicFill
//       className={`text-white cursor-pointer mx-3 text-3xl ${isRecording ? 'text-red-500' : ''}`}
//       title={isRecording ? "Stop recording" : "Start recording"}
//       onClick={handleMicClick}
//     />
//   );
// };

// export default MicQuestion;

import React, { useState, useContext, useEffect, useRef } from "react";
import { RiMicFill } from "react-icons/ri";
import { ContextApp } from "../utils/Context";
import axios from '../axios';

const MicQuestion = ({ currentChatId }) => {
  const {
    handleSendMessage, // Assurez-vous que handleSendMessage est dans le contexte
  } = useContext(ContextApp);

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);

        // Envoyer la question au backend
        await sendQuestionToBackend(transcript);
        
        // Envoyer la question au contexte
        handleSendMessage(transcript);
        
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('Speech recognition is not supported in this browser.');
    }
  }, [handleSendMessage]);

  const sendQuestionToBackend = async (message) => {
    try {
      const response = await axios.post(`/chat/${currentChatId}/question`, {
        id: currentChatId, // Inclure l'ID du chat
        question: message,
      });
      console.log('Question sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending question:', error);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      console.log('Recording stopped');
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      console.log('Recording started');
    }
  };

  return (
    <RiMicFill
      className={`text-white cursor-pointer mx-3 text-3xl ${isRecording ? 'text-red-500' : ''}`}
      title={isRecording ? "Stop recording" : "Start recording"}
      onClick={handleMicClick}
    />
  );
};

export default MicQuestion;
