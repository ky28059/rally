import {DateTime} from 'luxon';
import {exampleEvent} from '@/util/events';

// Components
import SignUpForm from '@/app/event/[id]/SignUpForm';
import SubmitConfetti from '@/app/event/[id]/SubmitConfetti';

// Icons
import {BsCalendar2Fill} from 'react-icons/bs';
import {IoMdPin} from 'react-icons/io';
import {BiSolidUser} from 'react-icons/bi';


export default async function EventPage({params}: {params: {id: string}}) {
    const event = getEvent(params.id);

    return (
        <div className="container pt-32 pb-16 flex gap-12 justify-between">
            <SubmitConfetti />

            <div>
                <h1 className="font-bold text-4xl mb-3">
                    {event.title}
                </h1>

                <div className="flex flex-wrap gap-x-10 text-gray-700 mb-4">
                    <div className="flex gap-2 items-center">
                        <BiSolidUser /> {event.author}
                    </div>
                    <div className="flex gap-2 items-center">
                        <BsCalendar2Fill />
                        {DateTime.fromISO(event.startTime).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
                        {' - '}
                        {DateTime.fromISO(event.startTime).startOf('day').equals(DateTime.fromISO(event.endTime).startOf('day')) ?
                            DateTime.fromISO(event.endTime).toLocaleString(DateTime.TIME_SIMPLE) :
                            DateTime.fromISO(event.endTime).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)
                        }
                    </div>
                    <div className="flex gap-2 items-center">
                        <IoMdPin /> {event.location}
                    </div>
                </div>

                <img
                    src={event.image}
                    className="w-full rounded aspect-video object-center object-cover mb-4"
                />
                <p>{event.desc}</p>
            </div>

            <aside className="sticky h-max top-24 pl-10 border-l border-gray-500 w-72">
                <h3 className="font-semibold mb-1 text-xl">Info</h3>
                <p>
                    {event.attendees.length} attending
                </p>
                {event.attendees.slice(-5).map(attendee => (
                    <div>{attendee.firstName} {attendee.lastName}</div>
                ))}
                {event.attendees.length == 0 && (
                    <p className="text-sm">
                        No one's attending yet. Be the first to join!
                    </p>
                )}
                {event.attendees.length > 5 && (
                    <button>View full list</button>
                )}

                <SignUpForm />
            </aside>
        </div>
    )
}

function getEvent(id: string) {
    return exampleEvent;
}
