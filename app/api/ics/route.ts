import admin from 'firebase-admin';
import {NextResponse} from 'next/server';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    if (!searchParams.get("uid")) return NextResponse.json(null, {status: 400});

    const document = await admin.firestore().collection('users').doc(searchParams.get('uid')!).get();
    if (!document.exists) return NextResponse.json(null, {status: 400});

    const eventIds: string[] = [...document.get('createdEvents'), ...document.get('joinedEvents')];

    // Fetch all the events
    const events = await admin.firestore().collection('events').get();
    const eventData = events.docs
        .filter(event => eventIds.includes(event.get("id")))
        .map(event => event.data())
    return NextResponse.json(eventData);
}
