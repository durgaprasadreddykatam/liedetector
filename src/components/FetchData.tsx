import React, { useEffect } from 'react';
import axios from 'axios';
import { Preferences } from '@capacitor/preferences';

const FetchData = ({ link, userId }: { link: string, userId: string }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(link, {
                    params: {
                        userId: userId
                    }
                })
                .then(response =>{
                    if(response.status === 200){
    // to use Ionic data
                        Preferences.set({
                            key:"testLie",
                            value:response.data.testLie
                        })
                    }
                })
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        return () => {
            
        };
    }, [link, userId]); 

    return null;
};

export default FetchData;
