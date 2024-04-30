import { useEffect } from "react";
import { Storage } from "@ionic/storage";
import React from "react";
import axios from "axios";

const TRAIN_LIE_KEY='trainLie'
const TRAIN_TRUTH_KEY='trainTruth'
const TEST_LIE_KEY='testLie'
const TEST_TRUTH_KEY='testTruth'

export interface eegdata {
    rowNumber : number;
    af3: number;
    t7: number;
    pz: number;
    t8: number;
    af4: number;
    
}


export function useStorage (userId:string){
    const [store,setStore] =React.useState<Storage>();
    const [storedTrainLie,SetStoredTrainLie] = React.useState<eegdata[]>([]);
    const [storedTrainTruth,SetStoredTrainTruth] = React.useState<eegdata[]>([]);
    const [storedTestLie,SetStoredTestLie] = React.useState<eegdata[]>([]);
    const [storedTestTruth,SetStoredTestTruth] = React.useState<eegdata[]>([]);

    useEffect(()=>{
        const initStorage = async () =>{
            const storage = new Storage({
                name: 'liedetectordb',
                
              });
              
            await storage.create();
            setStore(storage);
            const stored_train_lie_data= await storage.get(TRAIN_LIE_KEY) || [];
            SetStoredTrainLie(stored_train_lie_data);
            const stored_train_truth_data= await storage.get(TRAIN_TRUTH_KEY) || [];
            SetStoredTrainTruth(stored_train_truth_data);
            const stored_test_lie_data= await storage.get(TEST_LIE_KEY) || [];
            SetStoredTestLie(stored_test_lie_data)
            const stored_test_truth_data= await storage.get(TEST_TRUTH_KEY) || [];
            SetStoredTestTruth(stored_test_truth_data)

            if (stored_train_lie_data.length === 0 &&
                stored_train_truth_data.length === 0 &&
                stored_test_lie_data.length === 0 &&
                stored_test_truth_data.length === 0) {
                fetchData(storage);
            }

        }
        initStorage ();

        
    },[])

    const fetchData = async (store: Storage) =>{
        try {
            const response = await axios.get(`http://localhost:8080/mockData/getData?userId=${userId}`);
            if(response.status === 200){
                const datalistTrainLie = response.data.trainLie;
                const datalistTrainTruth = response.data.trainTruth;
                const datalistTestLie = response.data.testLie;
                const datalistTestTruth = response.data.testTruth;

                await store?.set(TRAIN_LIE_KEY, datalistTrainLie);
                await store?.set(TRAIN_TRUTH_KEY, datalistTrainTruth);
                await store?.set(TEST_LIE_KEY, datalistTestLie);
                await store?.set(TEST_TRUTH_KEY, datalistTestTruth);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors if needed
            return null; // or throw error
        }
    }

    function getTrainLie(){
        return storedTrainLie;
    }
    function getTrainTruth(){
        return storedTrainTruth;
    }
    function getTestLie(){
        return storedTestLie;
    }
    function getTestTruth(){
        return storedTestTruth;
    }
    return { getTrainLie, getTrainTruth, getTestLie, getTestTruth,fetchData };
}