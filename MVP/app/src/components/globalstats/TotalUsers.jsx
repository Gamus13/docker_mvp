import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { IoPeople } from 'react-icons/io5';

export default function TotalUsers() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('/users/total');
        setTotalUsers(response.data.total_users);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <BoxWrapper>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
        <IoPeople className="text-2xl text-white" />
      </div>
      <div className="pl-4">
        <span className="text-sm text-gray-500 font-light">Total Users</span>
        <div className="flex items-center">
          <strong className="text-xl text-gray-700 font-semibold">{totalUsers}</strong>
          <span className="text-sm text-red-500 pl-2">-30</span>
        </div>
      </div>
    </BoxWrapper>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
