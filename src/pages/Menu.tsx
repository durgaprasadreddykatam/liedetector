import { IonButtons, IonContent, IonHeader, IonIcon, IonMenu, IonMenuButton, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Route } from 'react-router';

import { analyticsOutline, clipboardOutline, compass, home, logOutOutline, personOutline, stopwatch, tvOutline } from 'ionicons/icons';

const Menu: React.FC = () => {

    return (
            <>
            
                <IonMenu contentId="main-content">
                    <IonHeader >
                        <IonToolbar color='tertiary'>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent  className="ion-padding ">
                        <div className=' h-16 w-full flex items-center hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 cursor-pointer '>
                            <IonIcon size="large" className='px-6' icon={home}></IonIcon>
                            <span>Home</span>
                        </div>
                        <div className=' h-16 w-full flex items-center hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 cursor-pointer '>
                                <IonIcon size="large" className='px-6' icon={compass}></IonIcon>
                                <span>Test Now</span>
                            </div>
                        <div className=' h-16 w-full flex items-center hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 cursor-pointer '>
                                <IonIcon size="large"  className='px-6' icon={analyticsOutline}></IonIcon>
                                <span>Retake Intro Evaluation</span>
                            </div>
                        <div className='h-16 w-full flex items-center hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 cursor-pointer '>
                            <IonIcon size="large"  className='px-6' icon={clipboardOutline}></IonIcon>
                            <span>Predictions History</span>
                        </div>
                        <div className='h-16 w-full flex items-center hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 cursor-pointer '>
                            <IonIcon size="large"  className='px-6' icon={personOutline}></IonIcon>
                            <span>Account</span>
                        </div>
                        <div className='h-16 w-full flex items-center hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 cursor-pointer '>
                            <IonIcon size="large"  className='px-6' icon={tvOutline}></IonIcon>
                            <span>View Intro Again</span>
                        </div>
                        <div className='h-16 w-full flex items-center hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 cursor-pointer '>
                            <IonIcon size="large"  className='px-6' icon={logOutOutline}></IonIcon>
                            <span>Sign Out</span>
                        </div>
                    </IonContent>
                </IonMenu>
            
              
            </>
          );
    
};

export default Menu;