import database, { firebase } from '../../firebase/firebase';
import { 
    SET_MATCHES, 
    SET_MESSAGES 
} from './types';

export const setMatches = (matches) => ({
    type: SET_MATCHES,
    matches
})

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    messages
})

export const startFetchUserDocument = () => async (dispatch) => {
    console.log('startFetchUserDocument is called');
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

// Listens to realtime updates on user's matches document. Every time matches document is updated in firestore, set updated data to redux store  
export const startFetchMatches = () => async (dispatch) => {
    console.log('startFetchMatches is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        const matches = await database.collection("matches").doc(uid).onSnapshot((doc) => {
            console.log("Current matches document: ", doc.data());
            dispatch(setMatches(matches.data().user_id));  
        });
    } catch (e) {
        console.error("Error fetching matches", e);
    }
}

// Listens to realtime updates on user's messages subcollection. Every time messages subcollection is updated in firestore, set updated data to redux store  
export const startFetchMessages = () => async (dispatch) => {
    console.log('startFetchMessages is called');
    const uid = firebase.auth().currentUser.uid; 
    try {
        const messages = await database.collection(`matches/${uid}/messages`).onSnapshot((snapshot) => {
            console.log("Current messages subcollection: ", snapshot.data());
            dispatch(setMessages(messages.data())); 
        }); 
    } catch (e) {
        console.error("Error fetching messages", e);
    }
}

