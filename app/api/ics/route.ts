import admin from 'firebase-admin';
import {NextResponse} from 'next/server';
import {getEventsOfUser} from '@/util/firebase';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    if (!searchParams.get("uid")) return NextResponse.json(null, {status: 400});

    const events = await getEventsOfUser(searchParams.get('uid')!)
    if (events === null) return NextResponse.json(null, {status: 400});
    return NextResponse.json(events);
}
