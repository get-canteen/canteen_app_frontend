import database, { firebase } from '../../firebase/firebase';
import { SET_GROUPS } from './types';

export const setGroups = (groups) => ({
    type: SET_GROUPS,
    groups
})

export const startFetchGroups = () => async (dispatch) => {
    console.log('startFetchGroups is called');
    try {
        const snapshot = await database.collection("groups").get();
        const groups = [];
        snapshot.docs.map(doc => groups.push(doc.data()));
        dispatch(setGroups(groups));  
    } catch (e) {
        console.error("Error fetching groups", e);
    }
}