import { firebase } from '../../firebase/firebase';

export class CloudFunctionManager {
    static acceptRecommendation = firebase.functions().httpsCallable('acceptRecommendation')

    static addRequest = firebase.functions().httpsCallable('addRequest')

    static countPostComments = firebase.functions().httpsCallable('countPostComments')

    static countPostLikes = firebase.functions().httpsCallable('countPostLikes')

    static createGroup = firebase.functions().httpsCallable('createGroup')

    static createMatch = firebase.functions().httpsCallable('createMatch')

    static declineRecommendation = firebase.functions().httpsCallable('declineRecommendation')

    static generateAlgoliaSearchApiKeys = firebase.functions().httpsCallable('generateAlgoliaSearchApiKeys')

    static generateMostPopularUsers = firebase.functions().httpsCallable('generateMostPopularUsers')

    static getQueryApiKey = firebase.functions().httpsCallable('getQueryApiKey')

    static getRecommendations = firebase.functions().httpsCallable('getRecommendations')
  
    static joinGroup = firebase.functions().httpsCallable('joinGroup')

    static onChatUpdated = firebase.functions().httpsCallable('onChatUpdated')

    static onNotificationUpdated = firebase.functions().httpsCallable('onNotificationUpdated')

    static onPostCommented = firebase.functions().httpsCallable('onPostCommented')

    static onPostLiked = firebase.functions().httpsCallable('onPostLiked')

    static onRequestReceived = firebase.functions().httpsCallable('onRequestReceived')

    static onUserCreated = firebase.functions().httpsCallable('onUserCreated')

    static onUserUpdated = firebase.functions().httpsCallable('onUserUpdated')

    static sendCollectionToAlgolia = firebase.functions().httpsCallable('sendCollectionToAlgolia')

    static setAlgoliaSearchAttributes = firebase.functions().httpsCallable('setAlgoliaSearchAttributes')
}
  