'use client'

import {useFirestore, useFirestoreDocData} from 'reactfire';
import {doc} from 'firebase/firestore'
import {useMounted} from '@/util/useMounted';
import SignUpForm from '@/app/event/[id]/SignUpForm';


export default function EventSidebar(props: {id: string}) {
    const firestore = useFirestore();
    const {data: event} = useFirestoreDocData(doc(firestore, 'events', props.id));

    const mounted = useMounted();

    return (
        <aside className="flex-none sticky h-max top-24 pl-10 border-l border-gray-500 w-72">
            <h3 className="font-semibold mb-1 text-xl">Info</h3>
            <p>
                {!mounted ? '-' : event?.attendees.length ?? '-'} attending
            </p>
            {/*{event.attendees.slice(-5).map(attendee => (*/}
            {/*    <div>j</div>*/}
            {/*))}*/}
            {event && event.attendees.length === 0 && (
                <p className="text-sm">
                    No one's attending yet. Be the first to join!
                </p>
            )}
            {/*{event.attendees.length > 5 && (*/}
            {/*    <button>View full list</button>*/}
            {/*)}*/}

            <SignUpForm id={props.id} />
        </aside>
    )
}
