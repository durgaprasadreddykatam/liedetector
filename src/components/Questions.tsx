import { IonButton, IonCard, IonCol, IonContent, IonGrid,  IonRow, } from '@ionic/react';
import React from 'react';
import Device from '../assets/eegdevice.png'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';

interface ContainerProps{
    onFinish:() => void;
}
const Questions: React.FC<ContainerProps> = ({ onFinish }) => {
    const SwiperButtonNext=({children}:any) =>{
        const swiper =useSwiper();
        return <IonButton onClick={ () => swiper.slideNext() }>{children}</IonButton>
    }

    return (
        <Swiper>
            <SwiperSlide>
                <IonGrid>
                    <IonRow  className='flex items-center justify-center'>
                        <IonCol  size='12' sizeMd='8' sizeLg='6' sizeXl='6'>
                            <IonCard className='flex flex-col justify-center items-center p-4'>
                                <span>Question</span>
                                <span className=' mt-4 text-lg font-bold text-black'> </span>
                                <div className='h-40 w-full mt-8'  >question</div>
                                <div className='h-40 w-full mt-8'  >answer</div>
                                <div className=' w-full mt-4 flex flex-row justify-end'>
                                <SwiperButtonNext>Next</SwiperButtonNext>
                                </div>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </SwiperSlide>
        </Swiper>
        
        
    );
};

export default Questions;

function onFinish(): React.FC<ContainerProps> {
    throw new Error('Function not implemented.');
}
