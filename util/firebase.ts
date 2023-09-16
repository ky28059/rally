'use server'

import admin from 'firebase-admin'
import type {Event} from '@/util/events'


admin.initializeApp({
    credential: admin.credential.cert('key.json')
})

export async function getAllEvents(): Promise<Event[]> {
    const collection = await admin.firestore().collection('events').get();
    return collection.docs.map(event => event.data());
}

export function getEventsWithIds(eventIds: string[]): Promise<Event[]> {
    return getAllEvents().then(events => events.filter(event => eventIds.includes(event.id)));
}

export function getEventsOfUser(userId: string[]): Promise<Event[] | null> {
    // Check if the user exists
    const document = await admin.firestore().collection('users').doc(userId).get();
    if (!document.exists) return null
    return getAllEvents().then(events => events.filter(event => ids.includes(event.id)));
}

export function getEventsWithTags(tags: string[]): Promise<Event[]> {
    return getAllEvents().then(events => events.filter(event => !tags.some(tag => !event.tags.includes(tag))));
}