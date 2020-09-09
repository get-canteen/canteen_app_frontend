import { firebase } from '../../firebase/firebase';

export class CloudFunctionManager {
    static addRequest = firebase.functions().httpsCallable('addRequest')

    static getRecommendations = firebase.functions().httpsCallable('getRecommendations')
  
    static declineRecommendation = firebase.functions().httpsCallable('declineRecommendation')
  
    static acceptRecommendation = firebase.functions().httpsCallable('acceptRecommendation')
  
    static joinGroup = firebase.functions().httpsCallable('joinGroup')
  
    static getQueryApiKey = firebase.functions().httpsCallable('getQueryApiKey')
}
  