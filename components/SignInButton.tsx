'use client'

import {useAuth, useFirestore, useFirestoreDoc} from 'reactfire';
import {signInWithPopup, OAuthProvider} from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {User} from '@/util/events';


export default function SignInButton() {
    const auth = useAuth();
    const firestore = useFirestore();

    async function signInWithMicrosoft() {
        const provider = new OAuthProvider('microsoft.com');

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const names = user.displayName?.split(" ")!;

            // Query the reference to the user's document; if it doesn't exist, create it.
            const reference = doc(firestore, 'users', user.uid);
            const document = await getDoc(reference);

            if (!document.exists()) {
                const parsedUser: User = {
                    id: user.uid,
                    firstName: names[0],
                    lastName: names.at(-1)!, // TODO: last name parsing
                    email: user.email!,
                    createdEvents: [],
                    joinedEvents: []
                }
                await setDoc(reference, parsedUser);
            }
            console.log('User info:', user);
        } catch (error) {
            console.error('Error during Microsoft sign-in:', error);
        }
    }

    return (
        <button onClick={signInWithMicrosoft} className="bg-blue-500 text-white px-4 py-2 my-4 rounded">
            Sign In
        </button>
    )
}
