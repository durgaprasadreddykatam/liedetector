import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Homeicon from '../../public/favicon.png';
import { personOutline} from 'ionicons/icons';

const Home: React.FC = () => {
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
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default Home;
