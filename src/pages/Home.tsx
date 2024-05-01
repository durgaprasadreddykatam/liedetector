import { IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useEffect } from 'react';
import Homeicon from '../../public/favicon.png';
import { personOutline} from 'ionicons/icons';
import Menu from './Menu';
import Intro from '../components/Intro';
import axios from 'axios';
import { Preferences } from '@capacitor/preferences';
import { UserDetails,defaultUserDetails } from '../components/userTypes';
import { useStorage } from '../components/useStorage';
import Calib from '../components/Calib';
import TestLink from '../components/TestLink';


const Home: React.FC<{ decodedToken: UserDetails }> = ({ decodedToken }) => {
    const apiUrl = import.meta.env.VITE_API_URL_JAVA;
    
    const router=useIonRouter();
    const[intro,setIntro] =React.useState(!decodedToken.introSeen);
    useStorage(decodedToken.userId);
    useEffect(() => {
        
    }, []);
    const finishintro =async () =>{
        setIntro(false);
        axios.post(`${apiUrl}/api/users/introSeenUpdate`,{"userId":decodedToken.userId,"introSeen":true})
        .then(response=>{
            if(response.status==200){
                Preferences.set({
                    key:'token',
                    value:response.data.token
                  })

            }
        })
        .catch(error=>{
            console.log(error);
        })
        router.push('/home')

        // Update in db that user has seen intro
        // push the user to Take initial Test
    }
    return (
        <>
        <Menu />
        
        <IonPage id="main-content">
            
            <IonHeader  className='flex justify-center items-center'>
                <IonToolbar color={'primary'}>
                    {/* <img className='h-10' src={Homeicon} alt='Home' /> */}
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle className='flex items-center justify-between'>
                        <span>Lie Detector</span>
                    </IonTitle>
                    </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div className='flex justify-center mt-4 font-bold'>
                    <div className='font-xl text-lg'>Welcome {decodedToken.firstName} {decodedToken.lastName}</div>
                </div>
                {/* Intro Display */}

                {intro &&
                    <Intro onFinish={finishintro}/>
                }
                {!intro  && <Calib decodedToken={decodedToken}/>}
                {(decodedToken.introTestTakenAsLiar && decodedToken.introTestTakenAsTruthTeller) && <TestLink/>}
                
            </IonContent>
        </IonPage></>
        
        
    );
};

export default Home;
