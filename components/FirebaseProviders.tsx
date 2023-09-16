'use client'

import {ReactNode} from 'react';
import {useFirebaseApp, AuthProvider, FirestoreProvider, AnalyticsProvider, FirebaseAppProvider, StorageProvider} from 'reactfire';
import {getFirestore} from 'firebase/firestore';
import {getAuth, OAuthProvider} from 'firebase/auth';
import {getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';


const firebaseConfig = {
    apiKey: "AIzaSyAHnw2uSi9oT8hM1brk-OGjbvG-ZG54pQI",
    authDomain: "event-site-4ed0a.firebaseapp.com",
    projectId: "event-site-4ed0a",
    storageBucket: "event-site-4ed0a.appspot.com",
    messagingSenderId: "1072836964793",
    appId: "1:1072836964793:web:5231fd707a7858e1988668",
    measurementId: "G-TNEMPX5GF7"
};

export default function FirebaseProviders(props: {children: ReactNode}) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <InnerFirebaseProviders>
                {props.children}
            </InnerFirebaseProviders>
        </FirebaseAppProvider>
    );
}

function InnerFirebaseProviders(props: {children: ReactNode}) {
    const firebase = useFirebaseApp();

    // Initialize auth and functions
    const auth = getAuth(firebase);
    const storage = getStorage(firebase);
    // const analytics = getAnalytics(firebase);

    // Initialize firestore with indexed db persistence
    // Currently throws weird errors, see https://github.com/FirebaseExtended/reactfire/issues/443
    const firestore = getFirestore(firebase);


    return (
        <AuthProvider sdk={auth}>
            <FirestoreProvider sdk={firestore}>
                <StorageProvider sdk={storage}>
                    {props.children}
                </StorageProvider>

                {/* <AnalyticsProvider sdk={analytics}> */}
                {/* </AnalyticsProvider> */}
            </FirestoreProvider>
        </AuthProvider>
    )
}
