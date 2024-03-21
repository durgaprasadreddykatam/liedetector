import { IonButton, IonCard, IonCol, IonContent, IonGrid,  IonRow, } from '@ionic/react';
import React from 'react';
import Device from '../assets/eegdevice.png'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';

interface ContainerProps{
    onFinish:() => void;
}
const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
    const SwiperButtonNext=({children}:any) =>{
        const swiper =useSwiper();
        return <IonButton onClick={ () => swiper.slideNext() }>{children}</IonButton>
    }
    const SwiperButtonPrevious=({children}:any) =>{
        const swiper =useSwiper();
        return <IonButton onClick={ () => swiper.slidePrev() }>{children}</IonButton>
    }

    return (
        <Swiper>
            <SwiperSlide>
                <IonGrid>
                    <IonRow  className='flex items-center justify-center'>
                        <IonCol  size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                            <IonCard className='flex flex-col justify-center items-center p-4'>
                                <span>Step 1</span>
                                <span className=' mt-4 text-lg font-bold text-black'>Place The EEG Device Over Head </span>
                                <img className='h-80 mt-8' src={Device} alt='Eeg HeadSet'></img>
                                <div className=' w-full mt-4 flex flex-row justify-end'>
                                    
                                <SwiperButtonNext>Next</SwiperButtonNext>
                                </div>
                                
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </SwiperSlide>
            <SwiperSlide>
            <IonGrid>
                    <IonRow  className='flex items-center justify-center'>
                        <IonCol  size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                            <IonCard className='flex flex-col justify-center items-center p-4'>
                                <span>Step 2</span>
                                <span className=' mt-4 text-lg font-bold text-black'>Click on Connect to Device</span>
                                    {/* <img className='h-80 mt-8' src={Device} alt='Eeg HeadSet'></img> */}
                                    <div className=' w-full mt-4 flex flex-row justify-between'>
                                        <SwiperButtonPrevious>Prev</SwiperButtonPrevious>
                                        <SwiperButtonNext>Next</SwiperButtonNext>
                                    </div>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </SwiperSlide>
            <SwiperSlide>
                <IonGrid>
                        <IonRow  className='flex items-center justify-center'>
                            <IonCol  size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                                <IonCard className='flex flex-col justify-center items-center p-4'>
                                    <span>Step 3</span>
                                    <span className=' mt-4 text-lg font-bold text-black'>Once Connection is Success.<br></br> Click Test Now to Take Test</span>
                                        {/* <img className='h-80 mt-8' src={Device} alt='Eeg HeadSet'></img> */}
                                        <div className=' w-full mt-4 flex flex-row justify-between'>
                                        <SwiperButtonPrevious>Prev</SwiperButtonPrevious>
                                        <SwiperButtonNext>Next</SwiperButtonNext>
                                    </div>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                </IonGrid>
            </SwiperSlide>
            <SwiperSlide>
                <IonGrid>
                        <IonRow  className='flex items-center justify-center'>
                            <IonCol  size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                                <IonCard className='flex flex-col justify-center items-center p-4'>
                                    <span>Step 4</span>
                                    <span className=' mt-4 text-lg font-bold text-black'>You will be required to respond truthfully or falsely to prompts displayed on the screen during the initial calibration process</span>
                                        {/* <img className='h-80 mt-8' src={Device} alt='Eeg HeadSet'></img> */}
                                        <div className=' w-full mt-4 flex flex-row justify-between'>
                                        <SwiperButtonPrevious>Prev</SwiperButtonPrevious>
                                        <SwiperButtonNext>Next</SwiperButtonNext>
                                    </div>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                </IonGrid>
            </SwiperSlide>
            <SwiperSlide>
                <IonGrid>
                        <IonRow className='flex items-center justify-center'>
                            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                                <IonCard className='flex flex-col justify-center items-center p-4'>
                                    <span>Step 5</span>
                                    <span className=' mt-4 text-lg  text-black'>Once the initial review is completed, you can test anytime, and we will be able to make predictions based on the input provided.</span>
                                    {/* <img className='h-80 mt-8' src={Device} alt='Eeg HeadSet'></img> */}
                                    <div className=' w-full mt-4 flex flex-row justify-between'>
                                        <SwiperButtonPrevious>Prev</SwiperButtonPrevious>
                                        <IonButton onClick={onFinish}>Finish</IonButton>
                                    </div>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                </IonGrid>
            </SwiperSlide>
            
        </Swiper>
        
        
    );
};

export default Intro;

function onFinish(): React.FC<ContainerProps> {
    throw new Error('Function not implemented.');
}
