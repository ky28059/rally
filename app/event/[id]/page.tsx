export default function EventPage() {
    return (
        <div className="bg-gradient-to-br from-purple-400 via-purple-600 to-purple-500 h-screen w-full flex items-center justify-center">
            <main className="bg-white px-6 py-4 rounded-lg w-48 py-8">
                <p>purple</p>
            </main>
        </div>
    )
}

export type Event = {
    id: string,
    title: string,
    desc: string,
    place?: string,
    time: string, // ISO
    image?: string, // base64? CDN?
    author: string,
    participants: string[],
    tags: string[]
}

export const exampleEvent: Event = {
    id: 'ailystvdc', // TODO
    title: 'Example event',
    desc: 'Please join us to save the turtles. Food will be provided.',
    time: '2023-09-16T00:00:00Z',
    image: 'https://picsum.photos/900/900',
    place: 'WALC basement',
    author: 'jlkbhadgkc', // TODO
    participants: [],
    tags: ['Food', 'Activism']
}

// TODO: profile picture?
type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    createdEvents: string[],
    joinedEvents: string[]
}
