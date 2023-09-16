export type Event = {
    id: string,
    title: string,
    desc: string,
    place?: string,
    time: string, // ISO
    image?: string, // base64? CDN?
    author: string,
    attendees: Attendee[],
    tags: string[]
}

type Attendee = {
    firstName: string,
    lastName: string,
    email?: string
}

// TODO: profile picture?
export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    createdEvents: string[],
    joinedEvents: string[]
}

export const exampleEvent: Event = {
    id: 'ailystvdc', // TODO
    title: 'Example event',
    desc: 'Please join us to save the turtles. Food will be provided.',
    time: '2023-09-16T00:00:00Z',
    image: 'https://picsum.photos/900/900',
    place: 'WALC basement',
    author: 'jlkbhadgkc', // TODO
    attendees: [],
    tags: ['Food', 'Activism']
}
