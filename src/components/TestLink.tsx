import { IonButton, IonCard, IonCol, IonContent, IonRow, useIonRouter } from '@ionic/react';
import React from 'react';

const TestLink: React.FC = () => {
    const router =useIonRouter();
    function testNow(){
        router.push('/taketest')

    }

    return (
        <IonRow className='flex items-center justify-center'>
            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                <IonCard className='p-3 flex flex-col'>
                    <span className='text-green-500 text-lg '>Intro tests done!</span>
                    <span className='text-purple-700'>Ready to unlock the next level?</span>
                    <span className='text-purple-700'>Curious about the accuracy of brainwave analysis ? </span>
                    <span className='text-blue-800 mt-4 text-2xl'>Click Test Now to initiate the evaluation process!</span>
                    <div className='mt-5 flex justify-center'>
                        <IonButton onClick={testNow}>Test Now</IonButton>
                    </div>
              
              
                </IonCard>      
            </IonCol>
            </IonRow>
        
    );
};

export default TestLink;