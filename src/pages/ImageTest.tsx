import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Questions from '../components/Questions';
import axios from 'axios';
import config from '../config';
import { Preferences } from '@capacitor/preferences';
import BackgroundLogger from '../components/BackgroundLogger';
import image from '../assets/EEgImages/1.jpeg'




interface ImageTestProps {
    jsonString: string;
  }
  interface question {
        question:string,
        questionId:string,
        questionType:string,
        answer:string

  }
  
  const ImageTest: React.FC<ImageTestProps> = ({ jsonString }) => {
    const router =useIonRouter();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const[timeStamp,setTimeStamp]=useState(new Date());
    const [present, dismiss] = useIonLoading(); 
    const [mountbackgroundworker,setMountBackGroundWorker]=useState(true);
    const storedData=JSON.parse(jsonString)
    console.log(storedData)
    const questions=storedData.questions
    const[subforProcessing,setsubforprocessing]=React.useState(false);
    const data={ userId:storedData.userId, sessionId:storedData.sessionId, role :storedData.role, trainOrTest :storedData.trainOrTest }

    const [userResponse,setUserResponse] =useState([{
            "questionId": "",
            "question": "",
            "answer": "",
            "userAnswer": "",
            "userRole": "",
            "questionType": "",
            "questionStartTime": "",
            "questionEndTime": ""
        
    }]);
  
    const nextQuestion = (temp:string) => {
        
            const formatted_TimeStamp = timeStamp.toISOString().slice(0, 19).replace('T', ' ');
            const currentTimeStamp = new Date();
            const formattedTimeStamp = currentTimeStamp.toISOString().slice(0, 19).replace('T', ' ');
            const updatedUserResponse = [...userResponse];
            updatedUserResponse[currentIndex] = {
                ...updatedUserResponse[currentIndex],
                questionId: questions[currentIndex].questionId,
                question:questions[currentIndex].question,
                answer:questions[currentIndex].answer,
                userAnswer:temp,
                userRole:data.role,
                questionType:questions[currentIndex].questionType,
                questionStartTime:formatted_TimeStamp,
                questionEndTime:formattedTimeStamp

            };
            setTimeStamp(currentTimeStamp);
            setUserResponse(updatedUserResponse);
            setCurrentIndex(currentIndex + 1);
    };
   
    


    function handleSubmit(temp:string){
        setMountBackGroundWorker(false);
        const formatted_TimeStamp = timeStamp.toISOString().slice(0, 19).replace('T', ' ');
            const currentTimeStamp = new Date();
            const formattedTimeStamp = currentTimeStamp.toISOString().slice(0, 19).replace('T', ' ');
            const updatedUserResponse = [...userResponse];
            updatedUserResponse[currentIndex] = {
                ...updatedUserResponse[currentIndex],
                questionId: questions[currentIndex].questionId,
                question:questions[currentIndex].question,
                answer:questions[currentIndex].answer,
                userAnswer:temp,
                userRole:data.role,
                questionType:questions[currentIndex].questionType,
                questionStartTime:formatted_TimeStamp,
                questionEndTime:formattedTimeStamp

            };
            setUserResponse(updatedUserResponse);
            setsubforprocessing(true);
            setMountBackGroundWorker(false);
    }

    function sendDatatoBackend(){
        const currentTimeStamp = new Date();
        const formattedTimeStamp = currentTimeStamp.toISOString().slice(0, 19).replace('T', ' ');
        present("Submitting Data for Processing")
        axios.post(`${config.API_ADDRESS1}/saveUserResponse`, {
            questions: userResponse,
            sessionEndTime:formattedTimeStamp,
            sessionId:data.sessionId,
            userId:data.userId,
            role:data.role,
            trainOrTest:data.trainOrTest
            
          })
          .then(response => {
            if(response.status === 200){
                if(response.data.token){
                    Preferences.set({
                        key:'token',
                        value:response.data.token
                      })
                      dismiss();
                      router.push('/home',"forward")
                }
                else if(response.data.command){
                    axios.post("http://127.0.0.1:5000/predict",{
                        "sessionId":data.sessionId,
                        "userId":data.userId,
                        "assignedNumber":response.data.command,
                        "role":data.role
                    })
                    .then(pyresponse => {
                        if(pyresponse.status === 200){
                            dismiss();
                            alert("Successfully Predicted It is a " + pyresponse.data);
                            router.push('/home',"forward")

                        }
                        else{
                            dismiss();
                            alert("Something Went Wrong")
                            router.push('/home',"forward")
                        }
                    })

                }
                const testProps = async () => {
                    await Preferences.remove({ key: 'roles' });
                  };
                  const removequestions = async () => {
                    await Preferences.remove({ key: 'questions' });
                  };
              
              
              
            } 
          })
          
          
          .catch(error => {
            dismiss();
            if(error.message === "Request failed with status code 401"){
              alert("Invalid Email/password")
            }
            else {
                alert("Something Went Wrong.Please try after Sometime")
            }
            
            
          });

    }
     return (
        <IonPage>
            <IonHeader >
                <IonToolbar color={'primary'}>
                    <IonTitle>Answer Truth Fully to this Questions</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
            <IonGrid>
                    <IonRow  className='flex items-center justify-center'>
                        <IonCol  size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                            <IonCard className='flex flex-col justify-center items-center p-4'>
                               {mountbackgroundworker && <BackgroundLogger sessionId={data.sessionId} trainorTest={data.trainOrTest} role={data.role} userId={data.userId}/>}
            {questions.length > 0 && !subforProcessing && (
                    <div className='flex justify-center flex-col items-center'>
                        <div>Question</div>
                        <div className='h-40 w-ful text-3xl text-black p-4'>{questions[currentIndex].question}</div>
                        <img src={questions[currentIndex].answer} alt =''></img>
                        <div className='flex justify-between'>
                            {(questions.length-currentIndex!==1 ) &&<IonButton onClick={()=>{nextQuestion('yes')}}>YES</IonButton>}
                            {(questions.length-currentIndex!==1 ) &&<IonButton  onClick={()=>{nextQuestion('no')}}>NO</IonButton>}
                            {(questions.length-currentIndex===1 ) &&<IonButton onClick={()=>{handleSubmit('yes')}}>YES</IonButton>}
                            {(questions.length-currentIndex===1 ) &&<IonButton  onClick={()=>{handleSubmit('no')}}>NO</IonButton>}

                        </div>
                    </div>
                )}
                {subforProcessing && <IonButton className='mt-5' onClick={sendDatatoBackend}>Submit Data</IonButton>}
                </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                    
            </IonContent>
        </IonPage>
    );
};

export default ImageTest;