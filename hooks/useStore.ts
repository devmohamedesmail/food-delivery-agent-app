
import { useContext } from 'react';
import { ProfileContext } from '@/context/ProfileContext';



export const useStore = () =>{
    const { profile ,loading}:any = useContext(ProfileContext);
    // const store = profile?.store;
    const store = profile?.store;
    
    return { store,loading };
}