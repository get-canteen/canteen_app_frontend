import { firebase } from '../../firebase/firebase';

export class CloudFunctionManager {
    static addRequest = firebase.functions().httpsCallable('addRequest')

    static getRecommendations = firebase.functions().httpsCallable('joinGroup')
  
    static declineRecommendation = firebase.functions().httpsCallable('joinGroup')
  
    static acceptRecommendation = firebase.functions().httpsCallable('joinGroup')
  
    static joinGroup = firebase.functions().httpsCallable('joinGroup')
  
    static getQueryApiKey = firebase.functions().httpsCallable('joinGroup')
}
  