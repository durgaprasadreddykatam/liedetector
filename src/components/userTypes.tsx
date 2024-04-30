
export interface UserDetails {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    expiry: number;
    introSeen: boolean;
    introTestTakenAsLiar: boolean,
    introTestTakenAsTruthTeller: boolean,
    assignedNumber:number
    
  }
  
  export const defaultUserDetails: UserDetails = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    expiry:0,
    introSeen: false,
    introTestTakenAsLiar: false,
    introTestTakenAsTruthTeller: false,
    assignedNumber:0
    
  };
  