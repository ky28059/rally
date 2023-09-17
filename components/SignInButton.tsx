'use client'

import {useRouter, useSearchParams} from 'next/navigation';
import {useAuth, useFirestore, useFirestoreDoc} from 'reactfire';
import {signInWithPopup, OAuthProvider} from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import {User} from '@/util/events';


export default function SignInButton() {
    const auth = useAuth();
    const firestore = useFirestore();

    const params = useSearchParams();
    const {push} = useRouter();

    async function signInWithMicrosoft() {
        const provider = new OAuthProvider('microsoft.com');

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Query the reference to the user's document; if it doesn't exist, create it.
            const reference = doc(firestore, 'users', user.uid);
            const document = await getDoc(reference);

            if (!document.exists()) {
                const parsedUser: User = {
                    id: user.uid,
                    name: user.displayName!,
                    email: user.email!,
                    joinedEvents: []
                }
                await setDoc(reference, parsedUser);
            }

            if (params.get('redirectTo')) push(params.get('redirectTo')!);

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
