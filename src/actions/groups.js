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

export const fetchAllGroups = async () => {
    console.log('fetchAllGroups is called');
    const snapshot = await database.collection("groups").get();
    const allGroups = {};
    snapshot.forEach(doc => {
        allGroups[doc.id] = doc.data();
    });
    console.log("All groups: ", allGroups);
    return allGroups;
}

// export const fetchGroupPosts = async (groupId) => {
//     console.log("fetchGroupPosts is called");
//     const uid = firebase.auth().currentUser.uid; 

//     const isMember = await database.collection("groups").doc(groupId).collection("members").doc(uid).get().then((docSnapshot) => {
//         return docSnapshot.exists;
//     }, (error) => {
//         throw new Error('unknown', error.message, error);
//     });

//     const type = await database.collection("groups").doc(groupId).get().then((docSnapshot) => {
//         return docSnapshot.data().type;
//     }, (error) => {
//         throw new Error('unknown', error.message, error);
//     });

//     if (type==="private" && !isMember) {
//         return "Posts are private. Join the group to view posts."
//     } else {
//         return new Promise((resolve, reject) => {
//             database.collection("groups").doc(groupId).collection("posts").onSnapshot((snapshot) => {
//                 const posts = {};
//                 snapshot.forEach(doc => {
//                     posts[doc.id] = doc.data();
//                 })
//                 resolve(posts); 
//             }, reject)
//         })
//     }
// }

// export const fetchGroupMembers = async (groupId) => {
//     console.log("fetchGroupMembers is called");
//     const uid = firebase.auth().currentUser.uid; 
//     const isMember = await database.collection("groups").doc(groupId).collection("members").doc(uid).get().then((docSnapshot) => {
//         return docSnapshot.exists;
//     }, (error) => {
//         throw new Error('unknown', error.message, error);
//     });

//     const type = await database.collection("groups").doc(groupId).get().then((docSnapshot) => {
//         return docSnapshot.data().type;
//     }, (error) => {
//         throw new Error('unknown', error.message, error);
//     });
    
//     if (type==="private" && !isMember) {
//         return "Members are private. Join the group to view members."
//     } else {
//         return new Promise((resolve, reject) => {
//             database.collection("groups").doc(groupId).collection("members").onSnapshot((snapshot) => {
//                 const members = {};
//                 snapshot.forEach(doc => {
//                     members[doc.id] = doc.data();
//                 })
//                 resolve(members);
//             }, reject)
//         })
//     }
// }
