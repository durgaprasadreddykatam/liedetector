import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import { UserDetails, defaultUserDetails } from "./userTypes";
import { Preferences } from "@capacitor/preferences";
import { jwtDecode } from "jwt-decode";
import { useIonLoading } from "@ionic/react";



export function useCapacitorStorage (){
    const [decodedToken,setDecodedToken] = useState<UserDetails>(defaultUserDetails);
    const [present, dismiss] = useIonLoading(); 

    useEffect(()=>{
        const getToken = async () => {
            present("Fetching Data");
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
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            }
            dismiss();
        }

        getToken();
    },[])

    function getTokenDetails (){
        return decodedToken;
    }
    return { getTokenDetails };
}