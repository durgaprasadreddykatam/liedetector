import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { jsonData } from '../components/S1S1eeg';


const ToBeDeleteted: React.FC = () => {
    const [csvLines, setCsvLines] = useState<string[]>([]);
    const logDataWithDelay = () => {
        let index = 0;
        const intervalId = setInterval(() => {
          if (index < jsonData.length) {
            index++;
          } else {
            clearInterval(intervalId);
          }
        }, 750);
      };

    const handleClick =  () => {
        logDataWithDelay();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>To Be Deleteted Later</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                Used only for Testing
                    <IonButton onClick={handleClick}>
                        Log CSv
                    </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ToBeDeleteted;