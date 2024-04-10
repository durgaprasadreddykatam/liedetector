import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { home } from 'ionicons/icons';
import React from 'react';
import { useIonRouter } from '@ionic/react';

const PredictionHistory: React.FC = () => {
    const router =useIonRouter();

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
            <IonContent  className="ion-padding">
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default PredictionHistory;