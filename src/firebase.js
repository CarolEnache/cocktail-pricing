import * as firebase from 'firebase';

// const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyAkXIrpFpBVPSEHLaQlLiBn_O1yMy8NbUs",
    authDomain: "cocktail-pricing-2.firebaseapp.com",
    databaseURL: "https://cocktail-pricing-2.firebaseio.com",
    projectId: "cocktail-pricing-2",
    storageBucket: "cocktail-pricing-2.appspot.com",
    messagingSenderId: "1062070460481"
};

firebase.initializeApp(config);
firebase.firestore()//.settings(settings);

export default firebase;