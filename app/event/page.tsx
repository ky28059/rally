export default function Event() {
    return (
        <div className="bg-gradient-to-br from-purple-400 via-purple-600 to-purple-500 h-screen w-full flex items-center justify-center">
            <main className="bg-white px-6 py-4 rounded-lg w-48">
                <p>purple</p>
            </main>
        </div>
    )
}

type Event = {
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

// TODO: profile picture?
type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    createdEvents: string[],
    joinedEvents: string[]
}
