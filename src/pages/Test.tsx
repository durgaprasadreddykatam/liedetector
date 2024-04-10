import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonLoading,  IonRouterContext, useIonRouter, IonIcon  } from '@ionic/react';
import axios from 'axios';
import React, { useState } from 'react';
import config from '../config';
import { useHistory } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import BluetoothDevices from '../components/ BluetoothDevices';
import { home } from 'ionicons/icons';


const Test: React.FC<{ decodedToken: any }> = ({ decodedToken }) => {
    const { userId, firstName, lastName, email, expiry } = decodedToken;
    const[deviceselected,setDeveiceSelected]=React.useState(false);
    const[selecteddevice,setSelectedDeveice]=React.useState("");
    const[connected,setConnected] =React.useState(true);
    const[showQuestionaire,setShowQuestionaire] =React.useState(false);
    const[questionaireSelected,setQuestionaireSelected] =React.useState(false);
    const [questionsFormat,setQuestionsFormat] =useState(null);
    const [present, dismiss] = useIonLoading(); 
    const router =useIonRouter();
    

    function handleDeviceSelection(event:CustomEvent){
        if(event.detail.value !=undefined){
            setDeveiceSelected(true);
            setSelectedDeveice(event.detail.value);
            
        }

    }

    function handleQuestionSelection(event:CustomEvent){
        if(event.detail.value !=undefined){
            setQuestionaireSelected(true);
            setQuestionsFormat(event.detail.value)
        }

    }

    function connectDevice(){
        // handle Device Connection Here and Show Device Connection Status
    }
    function continuetoAnswer(){
        if(questionsFormat!=undefined){
            const currentTimeStamp = new Date();
            const formattedTimeStamp = currentTimeStamp.toISOString().slice(0, 19).replace('T', ' ');
    
            present("Updating User Details and Password")
                axios.post(`${config.API_ADDRESS1}/generateSession`, {
                    "userId":userId,
                    "startTimeStamp":formattedTimeStamp,
                    "type":questionsFormat,
                    "count":10
                })
                .then(response => {
                    if(response.status === 200){
                        Preferences.set({
                            key:"questions",
                            value:JSON.stringify({
                                 questions:response.data.questions,
                                 userId:userId,
                                 sessionId:response.data.sessionId
                            })
                        })
                        dismiss();
                        router.push("/taketestnow",'root')

                    }
                    })
                    .catch(error => {
                        dismiss();
                        alert("Something Went Wrong.Please try after Sometime")
                    });

        }

    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='primary'>
                <div className='flex px-8 items-center'>
                    <IonTitle>Test Now</IonTitle>
                    <IonIcon onClick={()=>router.push("/home")} size='large' icon={home}></IonIcon>
                </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonGrid >
                <IonRow className='flex items-center justify-center'>
                    <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                        <IonCard className="flex flex-col p-2">
                        <IonList>
                            <IonItem>
                                <IonSelect onIonChange={handleDeviceSelection} placeholder="Select a Device">
                                <div slot="label">Select Connection <IonText color="danger">(Required)</IonText>
                                </div>
                                <IonSelectOption value="bluetooth">BlueTooth</IonSelectOption>
                                <IonSelectOption value="wifi">Wifi</IonSelectOption>
                                <IonSelectOption value="usb">USB</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            </IonList>
                            {selecteddevice ==='bluetooth'&& <BluetoothDevices/>}
                            {(selecteddevice !='bluetooth' && selecteddevice !='')  && <IonButton onClick={connectDevice} disabled={deviceselected ? false:true}>Scan</IonButton>}
                            {connected && <IonButton className='mt-8' onClick={()=>{setShowQuestionaire(true)}} >Proceed</IonButton>}
                        </IonCard>
                        {showQuestionaire && <IonCard className="flex flex-col p-2">
                        <IonList>
                            <IonItem>
                                <IonSelect onIonChange={handleQuestionSelection} placeholder="Select a Device">
                                <div slot="label">Select Format <IonText color="danger">(Required)</IonText>
                                </div>
                                <IonSelectOption value="Image">Pictures</IonSelectOption>
                                <IonSelectOption value="Random">Random Questions</IonSelectOption>
                                <IonSelectOption value="Arithmetic">Calculative</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            </IonList>
                            <IonButton onClick={continuetoAnswer} disabled={questionaireSelected ? false:true}>Continue</IonButton>

                        </IonCard>}

                    </IonCol>
                </IonRow>
            </IonGrid>
            </IonContent>
            
            
        </IonPage>
    );
};

export default Test;