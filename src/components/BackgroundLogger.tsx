import { jsonData } from '../components/S1S1eeg';
import { useEffect } from 'react';
import axios from 'axios';

const sessionId = '396de7ce-8e59-4504-912b-126a1796c0a0'; 

const BackgroundLogger: React.FC = () => {
  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    const logDataWithDelay = () => {
      let index = 0;
      intervalId = setInterval(() => {
        if (index < jsonData.length) {
          sendData(jsonData[index]);
          index++;
        } else {
          clearInterval(intervalId);
          console.log('Logging complete');
        }
      }, 750);
    };

    logDataWithDelay();

    // Cleanup function to stop data logging when unmounting
    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  const sendData = async (data: any) => {
    try {
      const payload = { sessionId, ...data };
      axios.put('http://localhost:8080/eegdata', payload)
        .then(response =>{
          if(response.status === 200){
            console.log("eeg data sent successfully")
          }
        })
        .catch(error =>{
          console.log("Error Writing data to Kafka");
        })
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return null; 
};

export default BackgroundLogger;
