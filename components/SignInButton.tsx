'use client'

import {signInWithPopup} from '@firebase/auth';
import {OAuthProvider} from 'firebase/auth';
import {useAuth} from 'reactfire';
import {User} from '@/util/events';

export default function SignInButton() {
    const auth = useAuth();

    async function signInWithMicrosoft() {
        const provider = new OAuthProvider('microsoft.com');

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const names = user.displayName?.split(" ")!;
            const parsedUser: User = {
                id: user.uid,
                firstName: names[0],
                lastName: names.at(-1)!,
                email: user.email!,
                createdEvents: [],
                joinedEvents: []
            }
            console.log('User info:', user);
        } catch (error) {
            console.error('Error during Microsoft sign-in:', error);
        }
    }

    return (
        <div className="mb-3">
            <button onClick={signInWithMicrosoft} className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign In {/* Use the text property here */}
            </button>
        </div>
    )
}
