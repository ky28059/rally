import {DateTime} from 'luxon';
import {getEventById, getUserById} from '@/util/firebase';
import {notFound} from 'next/navigation';

// Components
import EventSidebar from '@/app/event/[id]/EventSidebar';

// Icons
import {BsCalendar2Fill} from 'react-icons/bs';
import {IoMdPin} from 'react-icons/io';
import {BiSolidUser} from 'react-icons/bi';


export default async function EventPage({params}: {params: {id: string}}) {
    const event = await getEventById(params.id);
    if (!event) notFound();

    const author = await getUserById(event.author);

    return (
        <div className="container pt-32 pb-16 flex gap-12 justify-between">
            <div>
                <h1 className="font-bold text-4xl mb-3">
                    {event.title}
                </h1>

                <div className="flex flex-wrap gap-x-10 text-gray-700 mb-4">
                    <div className="flex gap-2 items-center">
                        <BiSolidUser /> {author!.name}
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
                    src={event.image ?? '/default.jpg'}
                    className="w-full rounded aspect-video object-center object-cover mb-4"
                />
                <p>{event.desc}</p>
            </div>

            <EventSidebar id={params.id} />
        </div>
    )
}
