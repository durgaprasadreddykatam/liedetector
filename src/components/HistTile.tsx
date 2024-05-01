import { IonButton, IonCard, IonCol,  IonRow, ReactComponentOrElement } from '@ionic/react';
import React from 'react';
import { format, parseISO } from 'date-fns';

interface Session {
    sessionId: string,
    sessiondate:string,
    sessionStartTime:string,
    reslut:string
    userResponses: UserResponse[] 
    
  }
  interface UserResponse {
    questionID: string,
    role: boolean,
    serAnswer:string,

  }
interface HistTileProps {
    session: Session; 
  }

const HistTile:React.FC<HistTileProps> = ({ session })=> {
    const[expand,setExpand]=React.useState(true);

    const formattedDate = (dateString: string) => {
        return format(new Date(dateString), "do MMMM yyyy");
    };

    const formattedTime = (timeString: string) => {
        return new Date(timeString).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };
    const formattedSessionDate = formattedDate(session.sessiondate);
    const formattedStartTime = formattedTime(session.sessionStartTime);
    console.log(session)
    
    

    return (
         <IonRow>
            <IonCol>
                <IonCard className='flex flex-col p-4'>
                    <span>
                        {formattedSessionDate}
                    </span>
                    <div className='flex'>
                        <span> {formattedStartTime}</span>
                    </div>
                    
                    <span className='text-red-600'>Result :{session.reslut}</span>
                    <div className='flex justify-end'>
                        {expand && <IonButton  onClick={()=>setExpand(false)}>viewmore</IonButton>}
                    </div>
                    
                    {!expand &&
                    <div className='flex flex-col'>
                        <div>Image</div>
                        <div>Predicted:</div>
                        <div>Your Response:</div>
                        <div className='flex justify-end'>
                        {!expand && <IonButton  onClick={()=>setExpand(true)}>collapse</IonButton>}
                    </div>
                        
                    </div>
                    
                    
                    }
                </IonCard>
            </IonCol>
         </IonRow>
        
    );
};

export default HistTile;