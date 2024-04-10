import { jsonData } from '../components/S1S1eeg';
import { useEffect } from 'react';
import axios from 'axios';


interface BackgroundLoggerProps {
  sessionId: string;
}
const BackgroundLogger: React.FC<BackgroundLoggerProps> = ({sessionId}) => {
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
