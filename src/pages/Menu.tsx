import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Route } from 'react-router';

import { analyticsOutline, clipboardOutline, compass, home, logOutOutline, personOutline, stopwatch, tvOutline } from 'ionicons/icons';

const Menu: React.FC = () => {
    const paths=[
        {name:'Home' ,url:'/home',icon:home },
        {name:'Test Now' ,url:'/taketest',icon:compass},
        {name:'Retake Intro Evaluation' ,url:'/retakeintro',icon:analyticsOutline },
        {name:'Predictions History' ,url:'/history',icon:clipboardOutline},
        {name:'Account' ,url:'/Account',icon:personOutline },
        {name:'View Intro Again' ,url:'/viewintro',icon:tvOutline},
        {name:'Log Out' ,url:'/logout',icon:logOutOutline }
    ]

    return (
            <>
            
            
                <IonMenu contentId="main-content">
                    <IonHeader >
                        <IonToolbar color='tertiary'>
                            <IonTitle>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent  className="ion-padding ">
                        {paths.map ((item,index)=> (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem routerLink={item.url} routerDirection='none' className=' h-16 w-full flex items-center hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer '>
                                    <IonIcon size="large" className='px-6' icon={item.icon}></IonIcon>
                                    <span>{item.name}</span>
                                </IonItem >
                            </IonMenuToggle>
                            
                        ))}
                    </IonContent>
                   
                </IonMenu>
            
              
            </>
          );
    
};

export default Menu;