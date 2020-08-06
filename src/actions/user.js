import database, { firebase } from '../../firebase/firebase';
import { SET_USER_DOCUMENT } from './types';

export const setUserDocument = (data) => ({
    type: SET_USER_DOCUMENT,
    userData: data
})

// Listens to realtime updates on user's users document. Every time user document is updated in firestore, set updated data to redux store  
export const startFetchUserDocument = (uid) => async (dispatch) => {
    console.log('startFetchUserDocument is called');
    try {
        await database.collection("users").doc(uid).onSnapshot((doc) => {
            console.log("Current user data: ", doc.data());
            dispatch(setUserDocument(doc.data()));
        });
    } catch (e) {
        console.error("Error fetching user", e);
    }
}

// When new user is created, we need to add a new user document to the users collection within firestore.
export const startAddUserDocument = async (uid, userDoc) => {
    console.log('startAddUserDocument is called');
    // const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).set(userDoc)
        console.log('User doc is successfully added to firestore');
    } catch (e) {
        console.log('Error creating user document', e);
    }
}

// Updates currently authenticated user's user document in firestore
export const startEditUserDocument = async (updates) => {
    console.log('startEditUserDocument is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            ...updates
        });
    } catch (e) {
        console.log("Error updating user", e);
    }
}

// Deletes currently authenticated user's user document from firestore
export const startDeleteUserDocument = async () => {
    console.log('startDeleteUserDocument is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).delete();
    } catch (e) {
        console.log("Error deleting user", e);
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

// Deletes an interest from currently authenticated user in firstore
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

// Adds to currently authenticated user's user document's teach_skill field in firestore
export const startAddTeachSkill = async (skill) => {
    console.log('startAddTeachSkill is called');
    const uid = firebase.auth().currentUser.uid;
    try {
        const user = await database.collection("users").doc(uid).get();
        const index = Object.keys(user.data().teach_skill).length;
        await database.collection("users").doc(uid).update({
            [`teach_skill.${index}`]: { ...skill }
        })
    } catch (e) {
        console.log("Error in adding teach skill", e);
    }
} 

// Adds to currently authenticated user's user document's learn_skill field in firestore
export const startAddLearnSkill = async (skill) => {
    console.log('startAddLearnSkill is called');
    const uid = firebase.auth().currentUser.uid;
    try {
        const user = await database.collection("users").doc(uid).get();
        const index = Object.keys(user.data().learn_skill).length;
        await database.collection("users").doc(uid).update({
            [`learn_skill.${index}`]: { ...skill }
        })
    } catch (e) {
        console.log("Error in adding learn skill", e);
    }
}

// Updates currently authenticated user's user document's teach_skill field at given index in firestore
export const startUpdateTeachSkill = async (skill, index) => {
    console.log('startUpdateTeachSkill is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            [`teach_skill.${index}`]: { ...skill }
        });
    } catch (e) {
        console.log("Error updating teach_skill", e);
    }
}

// Updates currently authenticated user's user document's learn_skill field at input index in firestore
export const startUpdateLearnSkill = async (skill, index) => {
    console.log('startUpdateLearnSkill is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            [`learn_skill.${index}`]: { ...skill }
        });
    } catch (e) {
        console.log("Error updating learn_skill", e);
    }
}