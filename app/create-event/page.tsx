'use client'

import {useEffect, useState} from 'react';
import type {Event} from '@/util/events';
// import DateTimePicker from 'react-datetime-picker';
import {useFirestore, useFirestoreDoc, useStorage, useUser} from 'reactfire';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';


export default function CreateEventForm() {
    const storage = useStorage();
    const firestore = useFirestore();
    const {data: user} = useUser();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [tags, setTags] = useState('');

    const [image, setImage] = useState<File | undefined>(undefined);

    async function createEvent() {
        let imageURI;
        if (image) {
            const reference = ref(storage, 'images/stars.jpg');
            await uploadBytes(reference, image);
            imageURI = await getDownloadURL(reference);
        }

        const id = 'lol';
        await setDoc(doc(firestore, 'events', id), {
            id,
            title,
            desc,
            location,
            time: dateTime.toISOString(),
            image: imageURI,
            author: user!.uid,
            attendees: [],
            tags: []
        } satisfies Event);
    }

    return (
        <div className="h-full flex justify-center items-center relative bg-black/50 px-4 py-16">
            <img
                src="/banner.jpg"
                alt="Banner image"
                className="absolute inset-0 w-full h-full object-cover object-center- -z-10"
            />

            <main className="bg-white shadow-md rounded px-10 sm:px-16 py-10 flex flex-col w-[48rem] max-w-full">
                <h5 className="text-3xl font-bold mb-4">
                    Create an Event
                </h5>

                <label htmlFor="title" className="font-semibold text-sm">
                    Title
                </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Stop climate change"
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-4"
                />

                <label htmlFor="desc" className="font-semibold text-sm">
                    Description
                </label>
                <input
                    type="text"
                    name="desc"
                    id="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Describe your event"
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-4"
                />

                <label htmlFor="location" className="font-semibold text-sm">
                    Location
                </label>
                <input
                    type="text"
                    name="location"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="WALC 6049"
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-4"
                />

                <label htmlFor="dateTimePicker" className="font-semibold text-sm">
                    Event Date and Time
                </label>
                {/*
                <DateTimePicker
                    id="dateTimePicker"
                    name ="dateTime"
                    onChange={setDateTime}
                    value={dateTime}
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-1"
                />
                */}

                <label htmlFor="image" className="font-semibold text-sm">
                    Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0])}
                    className="mb-4"
                />

                <label htmlFor="tags" className="font-semibold text-sm">
                    Tags
                </label>
                <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="WALC 6049"
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-8"
                />

                <button
                    onClick={createEvent}
                    className= "rounded font-semibold px-4 py-1.5 bg-yellow-400 hover:shadow-md hover:shadow-yellow-600 transition duration-200"
                >
                    Create event
                </button>
            </main>
        </div>
    )
}
