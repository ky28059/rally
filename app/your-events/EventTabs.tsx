'use-client'

import {useEffect} from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import {useRouter} from 'next/navigation';
import {useFirestore, useFirestoreCollectionData, useUser} from 'reactfire';
import {collection} from 'firebase/firestore';
import Event from '@/components/Event';
import {Event as EventProps} from '@/util/events';


export default function EventTabs() {
    const {status, data: user} = useUser();
    const {push} = useRouter();

    useEffect(() => {
        if (status !== 'success') return;
        if (!user) push('/auth-required?redirectTo=/your-events');
    }, [status])

    const firestore = useFirestore();
    const {data: events} = useFirestoreCollectionData(collection(firestore, 'events'));

    const createdEvents = events?.filter(event => event.author === user?.uid);
    const joinedEvents = events?.filter(event => event.attendees.includes(user?.uid));

    return (
        <Tab.Group as="div" className="z-10 container">
            <Tab.List className="flex font-semibold">
                <Tab className="px-4 py-3 flex-grow bg-gray-300 ui-not-selected:text-gray-600 ui-selected:bg-white rounded-t-md">
                    Events you've created
                </Tab>
                <Tab className="px-4 py-3 flex-grow bg-gray-300 ui-not-selected:text-gray-600 ui-selected:bg-white rounded-t-md">
                    Events you've joined
                </Tab>
            </Tab.List>

            <Tab.Panel className="px-10 py-8 bg-white rounded-b-md shadow-md" id="events">
                {!!createdEvents?.length && (
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] xl:grid-cols-4 gap-4">
                        {createdEvents?.map(event => (
                            <Event {...event as EventProps} key={event.id} />
                        ))}
                    </div>
                )}

                {!createdEvents?.length && (
                    <p>No upcoming events... <Link href="/create-event" className="text-blue-400">create one?</Link></p>
                )}
            </Tab.Panel>
            <Tab.Panel className="px-10 py-8 bg-white rounded-b-md shadow-md" id="events">
                {!!joinedEvents?.length && (
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] xl:grid-cols-4 gap-4">
                        {joinedEvents?.map(event => (
                            <Event {...event as EventProps} key={event.id} />
                        ))}
                    </div>
                )}

                {!joinedEvents?.length && (
                    <p>No upcoming events... <Link href="/" className="text-blue-400">RSVP for one?</Link></p>
                )}
            </Tab.Panel>
        </Tab.Group>
    )
}
