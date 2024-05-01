import { IonCard, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { home } from 'ionicons/icons';
import React from 'react';
import { useEffect,useState } from 'react';
import { useIonRouter } from '@ionic/react';
import HistTile from '../components/HistTile';
import { UserDetails,defaultUserDetails } from '../components/userTypes';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface Session {
    sessionId: string,
    sessiondate:string,
    sessionStartTime:string,
    reslut:string,
    userResponses: UserResponse[] 
    
  }
  interface UserResponse {
    questionID: string,
    role: boolean,
    serAnswer:string,

  }



const PredictionHistory: React.FC<{ decodedToken: UserDetails }> = ({ decodedToken }) => {
    const apiUrl = import.meta.env.VITE_API_URL_JAVA;
    const router = useIonRouter();
    const[data,setData]=useState<Session[]>([]);
    useEffect(()=>{
        
        axios.get(`${apiUrl}/api/fetchUserTestSessions`, { params: {userId: decodedToken.userId}})
    .then(response=>{ setData(response.data); })
    .catch(error=>{
        alert("someThing Went Wrong Please try after Sometime");
        console.log(error);
    })},[])
    
        const sessionTiles = data.map((session, index) => (
            <HistTile
            key={session.sessionId}
            session={session} 
            />
            
        ));
        return (

                <IonPage>
                    <IonHeader>
                    <IonToolbar  color={'primary'}>
                        <div className='flex px-8 items-center'>
                            <IonTitle>Prediction History</IonTitle>
                            <IonIcon onClick={()=>router.push("/home")} size='large' icon={home}></IonIcon>
                            
                        </div>
                            
                        </IonToolbar>
                    </IonHeader>
                    {data.length != 0 && <IonContent  className="ion-padding">
                        {sessionTiles}
                        
                    </IonContent>}
                    {data.length == 0 && <IonContent  className="ion-padding">
                        <IonCard>
                            
                        </IonCard>
                        
                    </IonContent>}

                </IonPage>
    );
};

export default PredictionHistory;
