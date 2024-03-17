import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {logInOutline, personCircleOutline,arrowBackOutline} from 'ionicons/icons'

const Register: React.FC = () => {

  function SubmitformData(e:any){
    e.preventDefault();
    console.log("Register")
  }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonIcon icon={arrowBackOutline} slot='start'></IonIcon>
                    <IonTitle >Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                  <IonCardContent>
                    <form onSubmit={SubmitformData}>
                    <IonInput label="First Name"  labelPlacement="floating" fill="outline" placeholder="First Name"></IonInput>
                    <IonInput className='mt-10'  label="Last Name"  labelPlacement="floating" fill="outline" placeholder="Last Name"></IonInput>

                    <IonInput className='mt-10'  label="Email" type="email" labelPlacement="floating" fill="outline" placeholder="Email"></IonInput>

                    <IonInput className='mt-10' label="Password" type="password" labelPlacement="floating" fill="outline" placeholder="Password"></IonInput>
                    <IonInput className='mt-10' label="Confirm Password" type="password" labelPlacement="floating" fill="outline" placeholder="Confirm Password"></IonInput>
                    

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

export default Register;
