import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BleClient } from '@capacitor-community/bluetooth-le';

const BluetoothDevices: React.FC = () => {
    const [connectedDevice, setConnectedDevice] = useState<any>(null);
    const connectToDevice = async (): Promise<void> => {
        try {
            await BleClient.initialize();
            const device = await BleClient.requestDevice({});
            const onDisconnect = (deviceId: string) => {
                setConnectedDevice(null); 
              };
            await BleClient.connect(device.deviceId, onDisconnect);
            setConnectedDevice(device);
        } catch (error) {
            console.error(error);
        }
    };
    const disconnectDevice = async (): Promise<void> => {
      try {
          if (connectedDevice) {
              await BleClient.disconnect(connectedDevice.deviceId);
              setConnectedDevice(null);
          }
      } catch (error) {
          console.error(error);
      }
  };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page Title</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton onClick={connectToDevice}>View Available devices</IonButton>
                {connectedDevice && (
                    <div>
                        <h2>Connected Device:</h2>
                        <div className='flex p-4 justify-between'>
                          <p>Name: {connectedDevice.name}</p>
                          <IonButton onClick={disconnectDevice}>Disconnect</IonButton>
                        </div>
                        
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default BluetoothDevices;
