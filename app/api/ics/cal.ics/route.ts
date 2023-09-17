import ical from 'ical-generator';
import {NextResponse} from 'next/server';
import {getEventsOfUser} from '@/util/firebase';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    if (!searchParams.get("uid")) return NextResponse.json(null, {status: 400});

    const events = await getEventsOfUser(searchParams.get('uid')!);
    if (events === null) return NextResponse.json(null, {status: 400});

    const calendar = ical({name: 'Rally Events'});
    events.forEach(event => {
        calendar.createEvent({
            start: event.startTime,
            end: event.endTime,
            summary: event.title,
            description: event.desc,
            location: event.location,
            url: (process.env.NODE_ENV === "production" ? "https://rally-xi.vercel.app" : "http://localhost:3000") + "/event/" + event.id
        });
    })

    return new NextResponse(calendar.toString(), {
        headers: {
            "Content-Type": "text/calendar; charset=utf-8",
            "Content-Disposition": 'attachment; filename="cal.ics"',
        },
    })
}
