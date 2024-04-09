import { IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Homeicon from '../../public/favicon.png';
import { personOutline} from 'ionicons/icons';
import Menu from './Menu';
import Intro from '../components/Intro';


const Home: React.FC<{ decodedToken: any }> = ({ decodedToken }) => {
   
    const { userId, firstName, lastName, email, expiry } = decodedToken;
    const[intro,setIntro] =React.useState(true);

    const finishintro =async () =>{
        setIntro(false);

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
                    <div className='font-xl text-lg'>Welcome {firstName} {lastName}</div>
                </div>
                {/* Intro Display */}

                {intro &&
                    <Intro onFinish={finishintro}/>
                }
                
            </IonContent>
        </IonPage></>
        
        
    );
};

export default Home;
