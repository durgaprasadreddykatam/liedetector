import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import {logInOutline, personCircleOutline} from 'ionicons/icons'
import LieDetectorLogo from '../../public/assets/logowithname.png'
import axios from 'axios';

const Login: React.FC = () => {

  const router=useIonRouter();
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  function handleFormChange(e:any) {
    setFormData(prevFormData =>{
      return {
        ...prevFormData,
        [e.target.name]:e.target.value
      }
    })

  }
 
  
  

  function SubmitformData(e:any){
    e.preventDefault();
    if(formData.email === '' || formData.password === ''){
      alert('All fields are required');
      return;
  }
  else if(formData.email.indexOf('@'&& '.') === -1){
      alert('Invalid Email');
      return;
  }
  else if(formData.password.length < 8){
      alert('Password should be minimum 8 characters');
      return;
  }
  else{
    axios.post(`http://localhost:8080/api/users/login`, {
      "email": formData.email,
      "password": formData.password
    })
    .then(response => {
      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        router.push('/Home',"forward")
      } 
    })
    .catch(error => {
      if(error.message === "Request failed with status code 401"){
        alert("Invalid Email/password")
      }
      else{
          alert("Something Went Wrong.Please try after Sometime")
      }
      
      
    });
  }
    
    
    // router.push('/home','root')
  }
  

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonTitle >Lie Detector</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" scrollY={false}>
              <div className='flex justify-center'>
              <img className='h-20 -ml-4 mt-10 items-center' src={LieDetectorLogo} alt='Lie Detector Logo'></img>
              </div>
              

                <IonCard>
                  <IonCardContent>
                    <form onSubmit={SubmitformData}>
        
                    <IonInput name='email'
                    onIonInput={handleFormChange}
                    
                              value={formData.email}
                              label="Email"
                              type="email"
                              labelPlacement="floating"
                              fill="outline"
                              placeholder="Email"></IonInput>

                    <IonInput name='password' 
                    onIonInput={handleFormChange}
                              value={formData.password}
                              label="Password"
                              className='mt-10'  
                              type="password" 
                              labelPlacement="floating" 
                              fill="outline" 
                              placeholder="Password">

                    </IonInput>
                    <IonButton  color={'fourth'}   className='mt-5' type='submit' expand='block'>
                      <span  className='text-white'>Login</span>
                      <IonIcon color={'light'} icon={logInOutline} slot='end'></IonIcon>
                      </IonButton>
                      </form>

                      <IonButton routerLink='/register' color={'fifth'}   className='mt-5' type='submit' expand='block'>
                      <span className='text-white'>Create Account</span>
                      <IonIcon icon={personCircleOutline} slot='end'></IonIcon>
                      </IonButton>
                    

              
                  </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;
