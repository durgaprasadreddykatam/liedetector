import React, { ReactNode,useState,useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { Preferences } from '@capacitor/preferences';
import { useIonRouter } from '@ionic/react';
import { UserDetails, defaultUserDetails } from './userTypes'


interface ValidatorProps {
    children: ReactNode;
  }

const Validator: React.FC<ValidatorProps> = ({children}) => { 
    const router=useIonRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [decodedToken,setDecodedToken] = useState<UserDetails>(defaultUserDetails);
    const getToken = async () => {
        const token=await Preferences.get({ key: 'token' });
        if (token.value && typeof token.value === 'string') {
            
            try {
                const decoded: any = jwtDecode(token.value);
                setDecodedToken({
                    userId:decoded.userId,
                    firstName: decoded.firstname,
                    lastName: decoded.lastname,
                    email: decoded.email,
                    expiry:decoded.exp,
                    introSeen:decoded.introSeen,
                    introTestTakenAsLiar:decoded.introTestTakenAsLiar,
                    introTestTakenAsTruthTeller:decoded.introTestTakenAsTruthTeller,
                    assignedNumber:decoded.assignedNumber
                    

                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
         }
            else{
                setIsLoading(false);
            }
    
}
    
    useEffect(() => {
        getToken();
    }, [decodedToken.userId])

    if (isLoading) {
        return <div>Loading...</div>;
    }
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { decodedToken: decodedToken } as { decodedToken: typeof decodedToken }); 
        }
        return child;
    });
    

    return (
        <div>
            {decodedToken.userId ? (
                <div>{childrenWithProps}</div>
            ) : (
                <div>
                    <span>Unauthorized</span>
                </div>
            )}
        </div>
    );
};

export default Validator;
