import admin from 'firebase-admin'
import type {Event, User} from '@/util/events'


admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY.replaceAll('\\n', '\n')
    })
})

export async function getAllEvents() {
    const collection = await admin.firestore().collection('events').get();
    return collection.docs.map(event => event.data()) as Event[];
}

export async function getEventById(eventId: string) {
    const document = await admin.firestore().collection('events').doc(eventId).get();
    return document.data() as Event | null;
}

export async function getEventsByIds(eventIds: string[]) {
    return getAllEvents().then(events => events.filter(event => eventIds.includes(event.id)));
}

export async function getEventsOfUser(userId: string) {
    // Check if the user exists
    const user = await admin.firestore().collection('users').doc(userId).get();
    if (!user.exists) return null;
    return getEventsByIds([...user.get('createdEvents'), ...user.get('joinedEvents')]);
}

export async function getEventsByTags(tags: string[]) {
    return getAllEvents().then(events => events.filter(event => !tags.some(tag => !event.tags.includes(tag))));
}

export async function getAllUsers() {
    const collection = await admin.firestore().collection('users').get();
    return collection.docs.map(event => event.data()) as User[];
}

export async function getUserById(userId: string) {
    const document = await admin.firestore().collection('users').doc(userId).get();
    return document.data() as User | null;
}

export async function getUsersByIds(userIds: string) {
    return getAllUsers().then(users => users.filter(user => userIds.includes(user.id)));
}

