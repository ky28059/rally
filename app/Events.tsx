'use client'

import Link from 'next/link';
import Event from '@/app/Event';
import {useFirestore, useFirestoreCollectionData} from 'reactfire';
import {collection} from 'firebase/firestore';
import type {Event as EventProps} from '@/util/events'


export default function Events() {
    const firestore = useFirestore();
    const {data: events} = useFirestoreCollectionData(collection(firestore, 'events'));

    return (
        <section className="container py-8">
            {events?.map(event => (
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] xl:grid-cols-4 gap-4">
                    <Event {...event as EventProps} key={event.id} />
                </div>
            ))}

            {!events?.length && (
                <p>No upcoming events... <Link href="/create-event" className="text-blue-400">create one here</Link>!</p>
            )}
        </section>
    )
}
