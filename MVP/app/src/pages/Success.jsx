import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-semibold text-green-600 mb-4">Success</h1>
      <p className="text-center text-gray-700 mb-6">
        We have received your payment. You can now access all the features in
        our app.
      </p>
      <button
        onClick={() => navigate("/plans/dashboard")}
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
      >
        Dashboard
      </button>
    </div>
  );
};

export default Success;
