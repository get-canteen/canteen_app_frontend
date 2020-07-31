import database, { firebase } from '../../firebase/firebase';
import { SET_USER_DOCUMENT } from './types';

export const setUserDocument = (data) => ({
    type: SET_USER_DOCUMENT,
    userData: data
})

// Listens to realtime updates on user's users document. Every time user document is updated in firestore, set updated data to redux store  
export const startFetchUserDocument = (uid) => async (dispatch) => {
    console.log('startFetchUserDocument is called');
    if (!uid) {
        throw new Error('uid does not exist in firestore!');
    }
    try {
        await database.collection("users").doc(uid).onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
            dispatch(setUserDocument(doc.data()));
        });
    } catch (e) {
        console.error("Error fetching user", e);
    }
}

// Updates currently authenticated user's users document in firestore and update redux store
export const startEditUserDocument = (updates) => async (dispatch) => {
    console.log('startEditUserDocument is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            ...updates
        });
        dispatch(setUserDocument(updates));
    } catch (e) {
        console.log("Error updating user", e);
    }
}

// Adds an interest to currently authenticated user in firstore
export const startAddInterest = async (interest) => {
    console.log('startAddInterest is called');
    const uid = firebase.auth().currentUser.uid;
    try {
        const userRef =  database.collection("users").doc(uid);
        await userRef.update({
            interests: firebase.firestore.FieldValue.arrayUnion(interest) 
        });
    } catch (e) {
        console.log("Error in adding interest", e);
    }
}

// Deletes an interest to currently authenticated user in firstore
export const startDeleteInterest = async (interest) => {
     console.log('startDeleteInterest is called');
     const uid = firebase.auth().currentUser.uid;
     try {
         const userRef =  database.collection("users").doc(uid);
         await userRef.update({
             interests: firebase.firestore.FieldValue.arrayRemove(interest) 
         });
     } catch (e) {
         console.log("Error in adding interest", e);
     }
}

export const startSetTeachSkill = async (skill) => {
    console.log('startSetTeachSkill is called');
    const uid = firebase.auth().currentUser.uid;
    try {
        const userRef =  database.collection("users").doc(uid);
    } catch (e) {
        console.log("Error in setting teach skill", e);
    }
} 

export const startSetLearnSkill = async (skill) => {
    console.log('startSetLearnSkill is called');
    const uid = firebase.auth().currentUser.uid;
    try {
        const userRef =  database.collection("users").doc(uid);
    } catch (e) {
        console.log("Error in setting learn skill", e);
    }
}
