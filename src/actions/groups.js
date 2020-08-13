import database from '../../firebase/firebase';
import { SET_ALL_GROUPS } from './types';

export const setAllGroups = (groups) => ({
    type: SET_ALL_GROUPS,
    groups
})

export const startFetchAllGroups = () => async (dispatch) => {
    console.log('startFetchAllGroups is called');
    try {
        const snapshot = await database.collection("groups").get();
        const groups = [];
        snapshot.docs.map((doc) => groups.push([doc.id, doc.data()]));
        dispatch(setAllGroups(groups));  
    } catch (e) {
        console.error("Error fetching groups", e);
    }
}
