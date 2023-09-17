export type Event = {
    id: string,
    title: string,
    desc: string,
    location?: string,
    startTime: string, // ISO
    endTime: string, // ISO
    image: string | null,
    author: string,
    attendees: string[],
    tags: string[]
}

// TODO: profile picture?
export type User = {
    id: string,
    name: string,
    email: string,
    joinedEvents: string[],
}

export type Building = {
    name: string
    lat: number
    lng: number
    abbr: string
}

export const exampleEvent: Event = {
    id: 'ailystvdc', // TODO
    title: 'Example event',
    desc: 'Please join us to save the turtles. Food will be provided.',
    startTime: '2023-09-16T00:00:00Z',
    endTime: '2023-09-16T01:00:00Z',
    image: 'https://picsum.photos/900/900',
    location: 'WALC basement',
    author: 'jlkbhadgkc', // TODO
    attendees: [],
    tags: ['Food', 'Activism']
}
