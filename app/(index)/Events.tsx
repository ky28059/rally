'use client'

import {useState} from 'react';
import {DateTime} from 'luxon';
import Link from 'next/link';
import Event from '@/components/Event';
import {useFirestore, useFirestoreCollectionData} from 'reactfire';
import {collection} from 'firebase/firestore';
import type {Event as EventProps} from '@/util/events'


export default function Events() {
    const firestore = useFirestore();
    const {data: events} = useFirestoreCollectionData(collection(firestore, 'events'));

    const [query, setQuery] = useState('');
    const filteredEvents = events
        ?.filter(event => event.title.toLowerCase().includes(query.toLowerCase()) || event.desc.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => DateTime.fromISO(b.startTime).valueOf() - DateTime.fromISO(a.startTime).valueOf())

    const popularEvents = events?.sort((a, b) => b.attendees.length - a.attendees.length)
        .slice(0, 4);

    return (
        <>
            <section className="container py-8" id="events">
                <h3 className="text-3xl font-bold mb-8 flex gap-3">
                    Upcoming events
                    <input
                        type="search"
                        className="text-base font-normal bg-white text-black w-[min(12.5rem,_100%)] mt-0.5 py-1 px-2.5 rounded-full border-2 border-tertiary focus:outline-none focus-visible:ring-[3px]"
                        value={query}
                        placeholder="Search events"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </h3>

                {!!filteredEvents?.length && (
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] xl:grid-cols-4 gap-4">
                        {filteredEvents?.map(event => (
                            <Event {...event as EventProps} key={event.id} />
                        ))}
                    </div>
                )}

                {!filteredEvents?.length && (
                    <p>No upcoming events... <Link href="/create-event" className="text-blue-400">create one here</Link>!</p>
                )}
            </section>

            <section className="container py-8">
                <h3 className="text-3xl font-bold mb-8 flex gap-3">
                    Popular events
                </h3>

                {!!popularEvents?.length && (
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] xl:grid-cols-4 gap-4">
                        {popularEvents?.map(event => (
                            <Event {...event as EventProps} key={event.id} />
                        ))}
                    </div>
                )}

                {!popularEvents?.length && (
                    <p>No upcoming events... <Link href="/create-event" className="text-blue-400">create one here</Link>!</p>
                )}
            </section>
        </>
    )
}
