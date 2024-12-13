import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const PaymentSuccessConfetti = ({ isPaymentSuccess }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* Afficher les confettis uniquement si le paiement est réussi */}
      {isPaymentSuccess && (
        <Confetti
          width={width}
          height={height}
          recycle={false} // Les confettis ne seront pas recyclés, ils disparaîtront après un moment
        />
      )}
    </div>
  );
};

export default PaymentSuccessConfetti;
