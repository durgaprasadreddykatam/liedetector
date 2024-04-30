import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonLoading,  IonRouterContext, useIonRouter, IonIcon  } from '@ionic/react';
import axios from 'axios';
import React, { useState } from 'react';
import config from '../config';
import { Preferences } from '@capacitor/preferences';
import BluetoothDevices from '../components/ BluetoothDevices';
import { home } from 'ionicons/icons';
import { UserDetails } from '../components/userTypes';
import ImageTest from './ImageTest';


const Test: React.FC<{ decodedToken: UserDetails }> = ({ decodedToken }) => {
    const apiUrl = import.meta.env.VITE_API_URL_JAVA;
    const[deviceselected,setDeveiceSelected]=useState(false);
    const[selecteddevice,setSelectedDeveice]=useState("");
    const[connected,setConnected] =useState(true);
    const [present, dismiss] = useIonLoading();
    const[role,setRole] =useState(); 
    const router =useIonRouter();
    const count=(decodedToken.introTestTakenAsLiar && decodedToken.introTestTakenAsTruthTeller) ? 1 :10
    const selectRole=(decodedToken.introTestTakenAsLiar && decodedToken.introTestTakenAsTruthTeller) ? "Select Role for Sending Eeg Mock Data" : "Select Roles"
    const trainOrTest = (decodedToken.introTestTakenAsLiar && decodedToken.introTestTakenAsTruthTeller) ? "Test" : "Train"
    const [imageTestVisible, setImageTestVisible] = useState(false);
    const[imageprops,setImageProps] =React.useState<string>("Hello");

    function handleDeviceSelection(event:CustomEvent){
        if(event.detail.value !=undefined){
            setDeveiceSelected(true);
            setSelectedDeveice(event.detail.value);
            
        }

    }
    function handleRole(event:CustomEvent){
        if(event.detail.value !=undefined){
            setRole(event.detail.value)
            
        }

    }
    function connectDevice(){
        // handle Device Connection Here and Show Device Connection Status
    }
    function continuetoAnswer(){
        const questionsFormat="Image";
        if(questionsFormat!=undefined){
            const currentTimeStamp = new Date();
            const formattedTimeStamp = currentTimeStamp.toISOString().slice(0, 19).replace('T', ' ');
    
            present("Setting Up Everything")
                axios.post(`${apiUrl}/generateSession`, {
                    "userId":decodedToken.userId,
                    "startTimeStamp":formattedTimeStamp,
                    "type":questionsFormat,
                    "count":count,
                    "role":role,
                    "trainOrTest":trainOrTest
                })
                .then(response => {
                    if(response.status === 200){
                        dismiss();
                        const string =JSON.stringify({questions:response.data.questions,userId:decodedToken.userId,sessionId:response.data.sessionId,role:role,trainOrTest:trainOrTest})
                        setImageProps(string);
                        setImageTestVisible(true);
                        // Preferences.set({
                        //     key:"questions",
                        //     value:JSON.stringify({
                        //          questions:response.data.questions,
                        //          userId:decodedToken.userId,
                        //          sessionId:response.data.sessionId,
                        //          role:role,
                        //          trainOrTest:trainOrTest
                        //     })
                            
                        // })
                        // .then(() => {
                        //     dismiss();
                        //     router.push("/imagetest",'root')
                        //   });
                        // dismiss();
                        

                    }
                    })
                    .catch(error => {
                        dismiss();
                        alert("Something Went Wrong.Please try after Sometime")
                    });

        }

    }
    return (
        <>
        {!imageTestVisible &&<IonPage>
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
                            {(!decodedToken.introTestTakenAsLiar || !decodedToken.introTestTakenAsTruthTeller) && <IonList>
                            <IonItem>
                                <IonSelect onIonChange={handleRole} placeholder="Select a Role">
                                <div slot="label">Select Roles <IonText color="danger">(Required)</IonText> </div>
                                    <IonSelectOption value="Truth Teller" disabled={decodedToken.introTestTakenAsTruthTeller}>Truth Teller</IonSelectOption>
                                    <IonSelectOption value="Liar" disabled={decodedToken.introTestTakenAsLiar}>Liar</IonSelectOption>
                                </IonSelect>
                                </IonItem>
                            </IonList>}

                            {/* case where intro Test is Completed */}
                            {(decodedToken.introTestTakenAsLiar && decodedToken.introTestTakenAsTruthTeller) && <IonList>
                            <IonItem>
                                <IonSelect onIonChange={handleRole} placeholder="Select Role for Sending Eeg Mock Data">
                                <div slot="label">Select Role for Sending Eeg Mock Data <IonText color="danger">(Required)</IonText> </div>
                                    <IonSelectOption value="Truth Teller" >Truth Teller</IonSelectOption>
                                    <IonSelectOption value="Liar" >Liar</IonSelectOption>
                                </IonSelect>
                                </IonItem>
                            </IonList>}
                            {connected && <IonButton className='mt-8' onClick={continuetoAnswer} disabled={role === undefined} >Proceed</IonButton>}
                        </IonCard>
                    </IonCol>

                </IonRow>
            </IonGrid>
            </IonContent>
            
            
        </IonPage>}
        {imageTestVisible && <ImageTest jsonString={imageprops} />}
    </>
        
    );
};

export default Test;