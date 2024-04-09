import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Questions from './Questions';
import axios from 'axios';
import config from '../config';
import { Preferences } from '@capacitor/preferences';




const TestNow: React.FC = () => {
    const router =useIonRouter();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');
    const[timeStamp,setTimeStamp]=useState(new Date());
    const [present, dismiss] = useIonLoading(); 
    const [questions,setQuestions] =useState([{
        question:"",
        questionId:"",
        questionType:"",
        answer:""
        
    }]);
    const[subforProcessing,setsubforprocessing]=React.useState(false);
    const [data,setData]=React.useState({
        userId:'',
        sessionId:""
    })

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
    
        const fetchData = async () => {
            present("Fetching data")
            const ret = await Preferences.get({ key: 'questions' });
            if(ret.value && typeof ret.value==='string'){
                const storedData=JSON.parse(ret.value);
                    setQuestions(storedData.questions);
                    setData({
                        userId:storedData.userId,
                        sessionId:storedData.sessionId
                    })
                
            }
            dismiss();
        }
        useEffect(()=>{
            fetchData();
        },[])
  
 
    const handleInputChange = (e:any) => {
        setAnswer(e.target.value);
    };

    const nextQuestion = () => {
            const formatted_TimeStamp = timeStamp.toISOString().slice(0, 19).replace('T', ' ');
            const currentTimeStamp = new Date();
            const formattedTimeStamp = currentTimeStamp.toISOString().slice(0, 19).replace('T', ' ');
        const updatedUserResponse = [...userResponse];
            updatedUserResponse[currentIndex] = {
                ...updatedUserResponse[currentIndex],
                questionId: questions[currentIndex].questionId,
                question:questions[currentIndex].question,
                answer:questions[currentIndex].answer,
                userAnswer:answer,
                userRole:"",
                questionType:questions[currentIndex].questionType,
                questionStartTime:formatted_TimeStamp,
                questionEndTime:formattedTimeStamp

            };
            setTimeStamp(currentTimeStamp);
            setUserResponse(updatedUserResponse);
            setAnswer('');
            setCurrentIndex(currentIndex + 1);
    };
    


    function handleSubmit(){
        const formatted_TimeStamp = timeStamp.toISOString().slice(0, 19).replace('T', ' ');
            const currentTimeStamp = new Date();
            const formattedTimeStamp = currentTimeStamp.toISOString().slice(0, 19).replace('T', ' ');
            const updatedUserResponse = [...userResponse];
            updatedUserResponse[currentIndex] = {
                ...updatedUserResponse[currentIndex],
                questionId: questions[currentIndex].questionId,
                question:questions[currentIndex].question,
                answer:questions[currentIndex].answer,
                userAnswer:answer,
                userRole:"",
                questionType:questions[currentIndex].questionType,
                questionStartTime:formatted_TimeStamp,
                questionEndTime:formattedTimeStamp

            };
            setUserResponse(updatedUserResponse);
            setsubforprocessing(true)
    }

    function sendDatatoBackend(){
        const currentTimeStamp = new Date();
        const formattedTimeStamp = currentTimeStamp.toISOString().slice(0, 19).replace('T', ' ');
        present("Submitting Data for Processing")
        axios.post(`${config.API_ADDRESS1}/saveUserResponse`, {
            questions: userResponse,
            sessionEndTime:formattedTimeStamp,
            sessionId:data.sessionId,
            userId:data.userId
            
          })
          .then(response => {
            if(response.status === 200){
              
              dismiss();
              router.push('/home',"forward")
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
            {questions.length > 0 && !subforProcessing && (
                    <div className='flex justify-center flex-col items-center'>
                        <div>Question</div>
                        <div className='h-40 w-ful text-3xl text-black p-4'>{questions[currentIndex].question}</div>
                        <IonInput  name='answer'
                            onIonInput={handleInputChange}
                              value={answer}
                              label="Answer"
                              labelPlacement="floating"
                              fill="outline"
                              placeholder="Answer" />
                        {(questions.length-currentIndex!==1 ) && <IonButton className='mt-5' onClick={nextQuestion}>Next</IonButton>}
                        {(questions.length-currentIndex===1 ) && <IonButton className='mt-5' onClick={handleSubmit}>Finish</IonButton>}
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

export default TestNow;