import React from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { useIonRouter } from '@ionic/react';

const Validator: React.FC<React.ReactNode> = (children) => { 
    const router=useIonRouter();
    React.useEffect(() => {
        const [formData, setFormData] = React.useState({
            firstName: '',
            lastName: '',
            email: ''
        });

        const token = localStorage.getItem('token');
        if (token && typeof token === 'string') {
            try {
                const decoded: { firstname: string, lastname: string, email: string } = jwtDecode(token);
                setFormData({
                    firstName: decoded.firstname,
                    lastName: decoded.lastname,
                    email: decoded.email
                });
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            router.push("/",'root')
        }
    }, [localStorage]); 

    return (
        <div>
            {children} 
        </div>
    );
};

export default Validator;
