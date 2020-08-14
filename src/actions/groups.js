import database from '../../firebase/firebase';
import { SET_ALL_GROUPS } from './types';

export const setAllGroups = (allGroups) => ({
    type: SET_ALL_GROUPS,
    allGroups
})

export const startSetAllGroups = () => async (dispatch) => {
    console.log('startSetAllGroups is called');
    try {
        const snapshot = await database.collection("groups").get();
        const allGroups = {};
        snapshot.forEach(doc => {
            allGroups[doc.id] = doc.data();
        });
        dispatch(setAllGroups(allGroups));
        console.log("All groups: ", this.props.allGroups);
    } catch (e) {
        console.error("Error fetching groups", e);
    }
}
