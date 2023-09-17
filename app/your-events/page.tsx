import type {Metadata} from 'next';
import EventTabs from './EventTabs';


export const metadata: Metadata = {
    title: 'Your events'
}

export default function YourEvents() {
    return (
        <div className="h-full flex justify-center relative px-4 pt-32 pb-16 bg-[url('/banner.jpg')] bg-cover bg-center bg-fixed">
            <div className="absolute inset-0 bg-black/50 w-full h-full" />
            <EventTabs />
        </div>
    )
}
