import database, { firebase } from '../../firebase/firebase';
import { SET_GROUPS } from './types';

export const setGroups = (groups) => ({
    type: SET_GROUPS,
    groups
})

export const startFetchAllGroups = () => async (dispatch) => {
    console.log('startFetchGroups is called');
    try {
        const snapshot = await database.collection("groups").get();
        const groups = [];
        snapshot.docs.map((doc) => groups.push([doc.id, doc.data()]));
        dispatch(setGroups(groups));  
    } catch (e) {
        console.error("Error fetching groups", e);
    }
}

export const startAddUserToGroup = async (groupId) => {
    console.log('startAddMemberToGroup is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        // Fetch user document 
        const user = await database.collection(`users/${uid}`).get();
        // add groupId to user's group subcollection
        await database.collection(`users/${uid}/groups`).doc(groupId).set({
            joined_on: Date.now(),
            role: "member"
        })
        // add user to group's members subcollection
        await database.collection(`groups/${groupid}/members`).doc(uid).set({
            display_name: user.display_name,
            joined_on: Date.now(),
            photo_url:  user.photo_url,
            title: user.title
        })
        console.log('Successfully add user to group');
    } catch (e) {
        console.log('Error adding user to group', e);
    }
}