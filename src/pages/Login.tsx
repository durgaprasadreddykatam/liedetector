import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {logInOutline, personCircleOutline} from 'ionicons/icons'
import LieDetectorLogo from '../../public/assets/logowithname.png'

const Login: React.FC = () => {

  function SubmitformData(e:any){
    e.preventDefault();
    console.log("Login")
  }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonTitle >Lie Detector</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <div className='flex justify-center'>
              <img className='h-20 mt-10 items-center' src={LieDetectorLogo} alt='Lie Detector Logo'></img>
              </div>
              

                <IonCard>
                  <IonCardContent>
                    <form onSubmit={SubmitformData}>
                    <IonInput label="Email" type="email" labelPlacement="floating" fill="outline" placeholder="Email"></IonInput>

                    <IonInput className='mt-10' label="Password" type="password" labelPlacement="floating" fill="outline" placeholder="Password"></IonInput>
                    <IonButton color={'fourth'}   className='mt-5' type='submit' expand='block'>
                      <span className='text-white'>Login</span>
                      <IonIcon color={'light'} icon={logInOutline} slot='end'></IonIcon>
                      </IonButton>

                      <IonButton routerLink='/register' color={'fifth'}   className='mt-5' type='submit' expand='block'>
                      <span className='text-white'>Create Account</span>
                      <IonIcon icon={personCircleOutline} slot='end'></IonIcon>
                      </IonButton>
                    

                    </form>
                  </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;
