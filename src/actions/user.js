import database from '../../firebase/firebase';
import { SET_USER_DOCUMENT } from './types';

export const setUserDocument = (data) => ({
    type: SET_USER_DOCUMENT,
    userData: data
})

export const startFetchUserDocument = (uid) => async (dispatch) => {
    console.log('startFetchUserDocument is called');
    if (!uid) {
        throw new Error('uid does not exist!');
    }
    try {
        const userDocument = await database.collection("users").doc(uid).get();
        dispatch(setUserDocument(userDocument.data()));
    } catch (e) {
        console.error("Error fetching user", e);
    }
}