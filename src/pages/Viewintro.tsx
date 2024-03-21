import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import Intro from '../components/Intro';

const Viewintro: React.FC = () => {
    const router=useIonRouter();
    const[intro,setIntro] =React.useState(true);
    const finishintro =async () =>{
        setIntro(false);
        router.push("/home",'back')
    }
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>View Intro</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {intro && <Intro onFinish={finishintro}/>}
            </IonContent>
        </IonPage>
    );
};

export default Viewintro;