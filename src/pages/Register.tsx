import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React from 'react';
import { checkmarkDone,arrowBackOutline} from 'ionicons/icons'
import axios from 'axios';

const Register: React.FC = () => {
    const router=useIonRouter();
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
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
    if(formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === ''){
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
    else if(formData.email.indexOf('@'&& '.') === -1){
        alert('Invalid Email');
        return;
    }
    else{
        axios.post(`http://localhost:8080/api/users/register`, {
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "email": formData.email,
        "password": formData.password
})
.then(response => {
if(response.status === 200){
localStorage.setItem('token', response.data.token);
router.push('/home','forward');
}
})
.catch(error => {
    if(error.response.data.message === 'Email already in use'){
        alert('Email Already in Use.Please Login')
        router.push('/','root')
    }
    else{
        alert("Something Went Wrong.Please try after Sometime")
    }

});
  }
  
}
function backButtonClick(){
    router.push('/','root');
  }
  

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'primary'}>
                    <IonIcon className='ml-4' onClick={backButtonClick} icon={arrowBackOutline} slot='start'></IonIcon>
                    <IonTitle >Register</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard>
                  <IonCardContent>
                    <form onSubmit={SubmitformData}>
                    <IonInput 

                    onIonInput={handleFormChange}
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
                    name='email'
                    value={formData.email}
                    className='mt-10'  
                    label="Email" 
                    type="email" 
                    labelPlacement="floating" 
                    fill="outline" 
                    placeholder="Email"></IonInput>

                    <IonInput 
                    onIonInput={handleFormChange}
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
                    

                    <IonButton routerLink='/register' color={'fifth'}   className='mt-5' type='submit' expand='block'>
                    <span className='text-white'>Create Account</span>
                    <IonIcon icon={checkmarkDone} slot='end'></IonIcon>
                    </IonButton>
                    

                    </form>
                  </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Register;
