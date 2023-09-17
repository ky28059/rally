'use client'

import {useLayoutEffect, useState} from 'react';
import SubmitConfetti from '@/app/event/[id]/SubmitConfetti';
import {useFirestore, useFirestoreDocData, useUser} from 'reactfire';
import {doc, updateDoc} from 'firebase/firestore';
import {User} from 'firebase/auth';


export default function SignUpForm(props: {id: string}) {
    const {data: user} = useUser();

    if (!user) return (
        <p className="mt-4">
            You must log in to RSVP for this event.
        </p>
    )

    return <SignUpButton id={props.id} user={user} />
}

function SignUpButton(props: {id: string, user: User}) {
    const [signedUp, setSignedUp] = useState(false);

    const firestore = useFirestore();
    const {data: eventDocument} = useFirestoreDocData(doc(firestore, 'events', props.id));
    const {data: userDocument} = useFirestoreDocData(doc(firestore, 'users', props.user.uid));

    useLayoutEffect(() => {
        if (!userDocument) return;
        setSignedUp(userDocument.joinedEvents.includes(props.id));
    }, [userDocument]);

    async function signUp() {
        await updateDoc(doc(firestore, 'users', props.user.uid), 'joinedEvents', [...userDocument.joinedEvents, props.id]);
        await updateDoc(doc(firestore, 'events', props.id), 'attendees', [...eventDocument.attendees, props.user.uid]);

        setSignedUp(true);
    }

    async function signDown() {
        await updateDoc(doc(firestore, 'users', props.user.uid), 'joinedEvents', userDocument.joinedEvents.filter((id: string) => id !== props.id));
        await updateDoc(doc(firestore, 'events', props.id), 'attendees', eventDocument.attendees.filter((id: string) => id !== props.user.uid));

        setSignedUp(false);
    }

    return (
        <>
            {/* TODO: the confetti freezes if you unattend while it is still on screen */}
            <SubmitConfetti run={signedUp} />
            {userDocument && (<>
                {signedUp ? (
                    <button
                        onClick={signDown}
                        className="rounded font-semibold px-4 py-1.5 bg-gray-400 hover:shadow-md hover:shadow-gray-600 transition duration-200 mt-4"
                    >
                        Unattend this event
                    </button>
                ) : (
                    <button
                        onClick={signUp}
                        className="rounded font-semibold px-4 py-1.5 bg-yellow-400 hover:shadow-md hover:shadow-yellow-600 transition duration-200 mt-4"
                    >
                        Sign up for this event
                    </button>
                )}
            </>)}
        </>
    )
}
