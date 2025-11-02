/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiGet } from '../../lib/api';
import { useEffect, useState } from 'react';

const Status = () => {
  const [message, setMessage] = useState('Server Error');

  useEffect(() => {
    const apiFetch = async () => {
      try {
        const msg: any = await apiGet('/status');
        console.log(msg);

        setMessage(msg ? msg.message : 'Server Down');
      } catch (error) {
        console.log(error);
      }
    };
    apiFetch();
  }, []);

  return (
    <>
      <h1>Status</h1>
      <p>{message}</p>
    </>
  );
};

export default Status;
