import React from "react";
import axios from "../axios";

const Card = ({ plan, index }) => {
  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500"]; // Couleurs pour chaque plan

  const handlePlan = async (planId) => {
    try {
      const res = await axios.post(`/checkout/${planId}`);
      if (res.status === 200) {
        window.location.replace(res.data.url);
      }
    } catch (error) {
      console.error("Erreur lors du traitement du plan:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 bg-blue-100 shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold">{plan?.name}</h2>
        <p className="text-gray-600">Get the party started</p>
        <h2 className="text-4xl font-bold my-4">${plan?.price}</h2>
        <p className="text-gray-600 mb-4">per {plan?.interval}</p>
        <p className="text-gray-500 mb-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, eos
          deserunt? Sunt unde fugiat atque?
        </p>
        <button
          className={`w-full py-2 text-white font-bold rounded-lg transition-transform transform hover:scale-105 ${colors[index]}`}
          onClick={() => handlePlan(plan?.id)}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Card;
