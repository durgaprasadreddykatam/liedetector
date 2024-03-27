import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";

export interface Response {
    userId: string,
    sessionId: string,
    questions: Question[]
}

export interface Question {
    questionId: string,
    question: string,
    answer: string,
    questionType: string
}

const RESPONSE_KEY = 'my-questions';

export function useStorage() {
    const [store, setStore] = useState<Storage | null>(null);
    const [response, setResponse] = useState<Response[]>([]);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: "questions"
            });
            const storeInstance = await newStore.create();
            setStore(storeInstance);

            const storedQuestions = await storeInstance.get(RESPONSE_KEY) || [];
            setResponse(storedQuestions);
        }
        initStorage();
    }, []);

    const storeResponse = async (responseData: Response) => {
        if (!store) return;

        
        setResponse(prevResponse => [...prevResponse, responseData]);

        
        await store.set(RESPONSE_KEY, [...response, responseData]);
    }

    const getStoredResponse = async () => {
        if (!store) return [];
        const storedResponse = await store.get(RESPONSE_KEY) || [];
        return storedResponse;
    }

    return { response, storeResponse ,getStoredResponse };
}
