import { Preferences } from '@capacitor/preferences';
import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import axios from 'axios';
import config from '../config';
import { checkmarkDone } from 'ionicons/icons';
import React from 'react';
import ResetPassword from '../assets/ChangePass.png'

const Update: React.FC<{ decodedToken: any }> = ({ decodedToken }) => {
    const { userId, firstName, lastName, email, expiry } = decodedToken;
    const router=useIonRouter();
    const [pswrdDisabeld,setPswrdDisabled] =React.useState(true);
    const [present, dismiss] = useIonLoading(); 
    const [formData, setFormData] = React.useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: '',
        confirmPassword: ''
      });
      

      function handleFormChange(e:any) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      }
  
  
      function SubmitformData(e:any){
        e.preventDefault();
        if(pswrdDisabeld){
            if(formData.firstName === '' || formData.lastName === '' ){
                alert('All fields are required');
                return;
            }
            else
            {
                present("Updating User Details")
                axios.post(`${config.API_ADDRESS}/update1`, {
                "firstName": formData.firstName,
                "lastName": formData.lastName,
                "email": formData.email
                })
                .then(response => {
                    if(response.status === 200){
                        dismiss();
                        alert('User Details Updated Sucessfully')
                    router.push('/home','root');
                    }
                    })
                    .catch(error => {
                        dismiss();
                        alert("Something Went Wrong.Please try after Sometime")
                    });
                }

        }
        else {
            if(formData.firstName === '' || formData.lastName === '' || formData.password === '' || formData.confirmPassword === ''){
                alert('All fields are required');
                return;
            }
            
            else if(formData.password !== formData.confirmPassword){
                alert('Password and Confirm Password should be same');
                return;
            }
            else if(formData.password.length < 8){
                alert('Password should be minimum 8 characters');
                return;
            }
            else{
                present("Updating User Details and Password")
                axios.post(`${config.API_ADDRESS}/update`, {
                "firstName": formData.firstName,
                "lastName": formData.lastName,
                "email": formData.email,
                "password":formData.password
                })
                .then(response => {
                    if(response.status === 200){
                        
                        dismiss();
                        alert('User Details Updated Sucessfully')
                    router.push('/home','root');
                    }
                    })
                    .catch(error => {
                        dismiss();
                        alert("Something Went Wrong.Please try after Sometime")
                    });

            }
        }
  
}

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonTitle >Update Personal Information</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                
                <IonGrid fixed>
                    <IonRow class='flex justify-center'>
                        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                            
                            <IonCard >
                            
                                <IonCardContent>
                                    <form onSubmit={SubmitformData}>
                                    <IonInput 
                                    disabled={true}
                                    value={formData.email}
                                    
                                    labelPlacement="floating" 
                                    fill="outline" 
                                    placeholder="Email"></IonInput>
                                    <IonInput 

                                    onIonInput={handleFormChange}
                                    className='mt-10'  
                                    name='firstName'
                                    value={formData.firstName}
                                    label="First Name"  
                                    labelPlacement="floating" 
                                    fill="outline" 
                                    placeholder="First Name">

                                    </IonInput>
                                    <IonInput 
                                    onIonInput={handleFormChange}
                                    name='lastName'
                                    value={formData.lastName}
                                    className='mt-10'  
                                    label="Last Name"  
                                    labelPlacement="floating" 
                                    fill="outline" 
                                    placeholder="Last Name">

                                    </IonInput>

                                    

                                    <IonInput 
                                    onIonInput={handleFormChange}
                                    disabled={pswrdDisabeld ? true : false}
                                    name='password'
                                    value={formData.password}
                                    className='mt-10' 
                                    label="Password" 
                                    type="password" 
                                    labelPlacement="floating" 
                                    fill="outline" 
                                    placeholder="Password">

                                    </IonInput>
                                    <IonInput 
                                    disabled={pswrdDisabeld ? true : false}
                                    onIonInput={handleFormChange}
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    className='mt-10' 
                                    label="Confirm Password" 
                                    type="password" 
                                    labelPlacement="floating" 
                                    fill="outline" 
                                    placeholder="Confirm Password">

                                    </IonInput>
                                    

                                    <IonButton  color={'fourth'}   className='mt-5' type='submit' expand='block'>
                                    <span className='text-white'>Update Details</span>
                                    <IonIcon icon={checkmarkDone} slot='end'></IonIcon>
                                    </IonButton>
                                    {pswrdDisabeld && <IonButton onClick={()=>{setPswrdDisabled(false)}}  color={'fifth'}   className='mt-5' type='submit' expand='block'>
                                    <span className='text-white'>Change Password</span>
                                    <img className='h-5 ml-4' src={ResetPassword}></img>
                                    </IonButton>}
                                    

                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                
            </IonContent>
        </IonPage>
    );
};

export default Update;