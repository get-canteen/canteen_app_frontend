import database, { firebase } from '../../firebase/firebase';
import { SET_USER_GROUPS } from './types';

export const setUserGroups = (groups) => ({
    type: SET_USER_GROUPS,
    groups
})

export const startSetUserGroups = () => async (dispatch) => {
    console.log("startFetchUserGroups is called");
    const uid = firebase.auth().currentUser.uid; 
    await database.collection("users").doc(uid).collection("groups").onSnapshot((snapshot) => {
        const userGroups = {};
        snapshot.forEach(doc => {
            userGroups[doc.id] = doc.data();
        });
        console.log("Current user doc groups subcollection: ", userGroups);
        dispatch(setUserGroups(userGroups));
    });
}