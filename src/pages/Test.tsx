import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Test: React.FC = () => {

    const[deviceselected,setDeveiceSelected]=React.useState(false);
    const[connected,setConnected] =React.useState(true);
    const[showQuestionaire,setShowQuestionaire] =React.useState(false);
    const[questionaireSelected,setQuestionaireSelected] =React.useState(false);

    function handleDeviceSelection(event:CustomEvent){
        if(event.detail.value !=undefined){
            setDeveiceSelected(true)
        }

    }

    function handleQuestionSelection(event:CustomEvent){
        if(event.detail.value !=undefined){
            setQuestionaireSelected(true)
        }

    }

    function connectDevice(){
        // handle Device Connection Here and Show Device Connection Status
    }
    function continuetoAnswer(){

    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='primary'>
                    <IonTitle>Test Now</IonTitle>
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
                                <div slot="label">Select Device <IonText color="danger">(Required)</IonText>
                                </div>
                                <IonSelectOption value="device1">Device 1</IonSelectOption>
                                <IonSelectOption value="device2">Device 2</IonSelectOption>
                                <IonSelectOption value="device3">device 3</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            </IonList>
                            <IonButton onClick={connectDevice} disabled={deviceselected ? false:true}>connect to Device</IonButton>
                            {connected && <IonButton className='mt-8' onClick={()=>{setShowQuestionaire(true)}} >Proceed</IonButton>}
                        </IonCard>
                        {showQuestionaire && <IonCard className="flex flex-col p-2">
                        <IonList>
                            <IonItem>
                                <IonSelect onIonChange={handleQuestionSelection} placeholder="Select a Device">
                                <div slot="label">Select Format <IonText color="danger">(Required)</IonText>
                                </div>
                                <IonSelectOption value="Picture">Pictures</IonSelectOption>
                                <IonSelectOption value="pics">Random Questions</IonSelectOption>
                                <IonSelectOption value="calc">Calculative</IonSelectOption>
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