import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Homeicon from '../../public/favicon.png';
import { personOutline} from 'ionicons/icons';


const Home: React.FC = () => {
    // Get the current date in milliseconds since Unix epoch
const currentDateInMillis = new Date().getTime();

// Convert milliseconds to seconds
const currentDateInSeconds = Math.floor(currentDateInMillis / 1000);

console.log(currentDateInSeconds,':Current date in seconds since Unix epoch:', currentDateInSeconds);

   
   
    
    

    
    return (
        <IonPage>
            <IonHeader  className='flex justify-center items-center'>
                <IonToolbar color={'primary'}>
                    {/* <img className='h-10' src={Homeicon} alt='Home' /> */}
                    <IonTitle className='flex items-center justify-between'>
                        <span>Lie Detector</span>
                        <IonIcon icon={personOutline}></IonIcon>
                    </IonTitle>
                    </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                
            </IonContent>
        </IonPage>
    );
};

export default Home;
