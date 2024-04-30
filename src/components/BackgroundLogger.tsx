import { useEffect } from 'react';
import axios from 'axios';
import { useStorage } from './useStorage';



interface BackgroundLoggerProps {
  sessionId: string;
  trainorTest: string,
  role: string
  userId:string
}
const BackgroundLogger: React.FC<BackgroundLoggerProps> = ({sessionId,trainorTest,role,userId}) => {
  const apiUrl = import.meta.env.VITE_API_URL_JAVA;
  const {getTrainLie,getTrainTruth,getTestLie,getTestTruth} =useStorage(userId);
  const data = role === "Truth Teller" 
    ? (trainorTest ==='Train' ? getTrainTruth() : getTestTruth())
    : (trainorTest ==='Train' ? getTrainLie() : getTestLie());
  let intervalId: NodeJS.Timeout;
  const jsonData=data;
  useEffect(() => {
    const sendDataPerSecond = () => {
        let index = 0;
        const batchSize = 128;
        const intervalMilliseconds = 1000;

        intervalId = setInterval(() => {
            if (index < jsonData.length) {
                const batch = jsonData.slice(index, index + batchSize);
                sendData(batch);
                index += batchSize;
            } else {
                clearInterval(intervalId);
            }
        }, intervalMilliseconds);
    };

    sendDataPerSecond();

    
    return () => clearInterval(intervalId);
}, [jsonData]);
 

  const sendData = async (data: any) => {
    try {
      const payload = {
        sessionId: sessionId,
        role:role,
        trainorTest:trainorTest,
        eegdata: [...data]
      };
      axios.put(`${apiUrl}/eegdata`, payload)
        .then(response =>{
          if(response.status === 200){
          }
        })
        .catch(error =>{
          console.log("Error Sending data");
        })
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return null; 
};

export default BackgroundLogger;
