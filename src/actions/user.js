import database from '../../firebase/firebase';
import { SET_USER_PROFILE } from './types';

export const setUserProfile = (data) => ({
    type: SET_USER_PROFILE,
    userData: data
})

export const startSetUserProfile = (user) => {
    console.log('startSetUser is called');
    return async (dispatch, getState) => {
        // const authUser =  await getState().auth.user;
        // if (authUser !== null) {
            const userRef = database.collection("users").doc(user.uid);
            const user = await userRef.get();
            const data = user.data();
            console.log('Document data', data);
            dispatch(setUserProfile(data));
        // }
    }
}