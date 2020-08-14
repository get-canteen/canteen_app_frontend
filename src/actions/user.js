import database, { firebase } from '../../firebase/firebase';
import { SET_USER_DOCUMENT, SET_USER_GROUPS } from './types';

export const setUserDocument = (data) => ({
    type: SET_USER_DOCUMENT,
    userData: data
})

export const setUserGroups = (groups) => ({
    type: SET_USER_GROUPS,
    groups
})

// Listens to realtime updates on user's users document. Every time user document is updated in firestore, set updated data to redux store  
export const startSetUserDocument = () => async (dispatch) => {
    console.log('startSetUserDocument is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).onSnapshot((doc) => {
            console.log("Current user document: ", doc.data());
            dispatch(setUserDocument(doc.data()));
        });
    } catch (e) {
        console.error("Error fetching user", e);
    }
}

export const startSetUserGroups = () => async (dispatch) => {
    console.log("startFetchUserGroups is called");
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).collection("groups").onSnapshot((snapshot) => {
            const userGroups = {};
            snapshot.forEach(doc => {
                userGroups[doc.id] = doc.data();
            });
            console.log("Current user groups: ", userGroups);
            dispatch(setUserGroups(userGroups));
        });
    } catch (e) {
        console.error("Error fetching user", e);
    }
}

// When new user is created, we need to add a new user document to the users collection within firestore.
export const addUserDocument = async (userDoc) => {
    console.log('startAddUserDocument is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).set(userDoc)
        console.log('User doc is successfully added to firestore');
    } catch (e) {
        console.log('Error creating user document', e);
    }
}

// Updates currently authenticated user's user document in firestore
export const editUserDocument = async (updates) => {
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
export const deleteUserDocument = async () => {
    console.log('startDeleteUserDocument is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).delete();
    } catch (e) {
        console.log("Error deleting user", e);
    }
}

// Adds an interest to currently authenticated user in firstore
export const addInterest = async (interest) => {
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
export const deleteInterest = async (interest) => {
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
export const addTeachSkill = async (skill) => {
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
export const addLearnSkill = async (skill) => {
    console.log('startAddLearnSkill is called');
    const uid = firebase.auth().currentUser.uid;
    try {
        const user = await database.collection("users").doc(uid).get();
        const length = Object.keys(user.data().learn_skill).length;
        const indexArr = Object.keys(user.data().learn_skill);
        const lastIndex = indexArr[length - 1];
        await database.collection("users").doc(uid).update({
            [`learn_skill.${lastIndex + 1}`]: { ...skill }
        })
    } catch (e) {
        console.log("Error in adding learn skill", e);
    }
}

// Updates currently authenticated user's user document's teach_skill field at given index in firestore
export const updateTeachSkill = async (skillData, index) => {
    console.log('startUpdateTeachSkill is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            [`teach_skill.${index}`]: { ...skillData }
        });
    } catch (e) {
        console.log("Error updating teach_skill", e);
    }
}

// Updates currently authenticated user's user document's learn_skill field at input index in firestore
export const updateLearnSkill = async (skillData, index) => {
    console.log('startUpdateLearnSkill is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            [`learn_skill.${index}`]: { ...skillData }
        });
    } catch (e) {
        console.log("Error updating learn skill", e);
    }
}

// Deletes currently autherntiated user's user document's teach_skill field at input index in firestore
export const deleteTeachSkill = async (index) => {
    console.log('startDeleteTeachSkill is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            [`teach_skill.${index}`]: firebase.firestore.FieldValue.delete()
        });
    } catch (e) {
        console.log("Error deleting teach skill", e);
    }
}

// Deletes currently autherntiated user's user document's learn_skill field at input index in firestore
export const deleteLearnSkill = async (index) => {
    console.log('startDeleteLearnSkill is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            [`learn_skill.${index}`]: firebase.firestore.FieldValue.delete()
        })
    } catch (e) {
        console.log("Error deleting learn skill", e);
    }
}

export const updateProfilePhoto = async (url) => {
    console.log('startUpdateUserProfilePhoto is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        await database.collection("users").doc(uid).update({
            photo_url: url
        })
    } catch (e) {
        console.log("Error deleting learn skill", e);
    }
}

export const fetchGroupPosts = async (groupId) => {
    console.log("fetchGroupPosts is called");
    try {
        const snapshot = await database.collection("groups").doc(groupId).collection("posts").get()
        // return snapshot.docs.map(doc => {
        //     return { id: doc.id, ...doc.data() }
        // })
        const posts = {};
        snapshot.forEach(doc => {
            posts[doc.id] = doc.data();
        });
        return posts;
    } catch (e) {
        console.log("Error fetching group posts", e);
    }
}

export const fetchGroupMembers = async (groupId) => {
    console.log("fetchGroupMembers is called");
    try {
        const snapshot = await database.collection("groups").doc(groupId).collection("members").get()
        // return snapshot.docs.map(doc => {
        //     return { id: doc.id, ...doc.data() }
        // })
        const members = {};
        snapshot.forEach(doc => {
            members[doc.id] = doc.data();
        });
        return members;
    } catch (e) {
        console.log("Error fetching group members", e);
    }
}