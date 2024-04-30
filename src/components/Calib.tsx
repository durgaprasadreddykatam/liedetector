import { IonButton, IonCard, IonCol, IonImg, IonRow, useIonRouter } from '@ionic/react';
import React from 'react';
import liar from '../assets/liar.jpeg'
import { UserDetails } from './userTypes';

const Calib: React.FC<{decodedToken:UserDetails}> = ({decodedToken}) => {
    const router =useIonRouter();
    const statusTruth = decodedToken.introTestTakenAsTruthTeller ? "Completed" : "Pending";
    const statusLie= decodedToken.introTestTakenAsLiar ? "Completed" : "Pending";
    const buttonText=(decodedToken.introTestTakenAsLiar && decodedToken.introTestTakenAsTruthTeller) ? "ReTake Intro Test" : "Complete Intro Tests"

    function clickToNextPage(){
        if(buttonText === "Complete Intro Tests"){
            router.push('/taketest')

        }
        else{

        }

    }

    return (
        <IonRow className='flex items-center justify-center'>
                  <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                <IonCard className='p-3'>
                        <div className='text-violet-800 font-extrabold text-3xl'>Status of Initial Tests Required</div>
                        <div className='flex mt-5 items-center justify-between'>
                            <div className='text-lg text-cyan-950 font-bold'>Test As Truth Teller</div>
                            <div className={`text-sm ${statusTruth === "Completed" ? "text-green-500" : "text-red-500"}`}>{statusTruth}</div>
                            
                        </div>
                        <div className='flex mt-5 items-center justify-between'>
                            <div className='text-lg font-bold text-cyan-950'>Test As Liar</div>
                            <div className={`text-sm ${statusLie === "Completed" ? "text-green-500" : "text-red-500"}`}>{statusLie}</div>
                            
                        </div>
                        {(decodedToken.introTestTakenAsLiar && decodedToken.introTestTakenAsTruthTeller) && <div className='mt-4 text-indigo-600'>Ready to explore the depths of authenticity? You Can do it Now !</div>}
                        
                        {(!decodedToken.introTestTakenAsLiar || !decodedToken.introTestTakenAsTruthTeller) && <div className='mt-5 flex justify-center'>
                            <IonButton onClick={clickToNextPage}>{buttonText}</IonButton>
                        </div>}
                        
                        
                </IonCard>      
            </IonCol>
        </IonRow>
        
        
        
    );
};

export default Calib;