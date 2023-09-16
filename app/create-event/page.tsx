'use client'

import {useState} from 'react';
// import DateTimePicker from 'react-datetime-picker';
import {useFirestore, useFirestoreDoc, useStorage, useUser} from 'reactfire';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import {AiOutlineDownload} from 'react-icons/ai';
import type {Event} from '@/util/events';


export default function CreateEventForm() {
    const storage = useStorage();
    const firestore = useFirestore();
    const {data: user} = useUser();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [tags, setTags] = useState('');

    const [dragging, setDragging] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);

    // const {status, data: buildings} = useFirestoreDoc(doc(firestore, 'buildings', 'buildings'))

    async function createEvent() {
        const {id} = await (await fetch('/api/uuid')).json();

        let imageURI;
        if (image) {
            const reference = ref(storage, `images/${id}.${image.type}`);
            await uploadBytes(reference, image);
            imageURI = await getDownloadURL(reference);
        }

        await setDoc(doc(firestore, 'events', id), {
            id,
            title,
            desc,
            location,
            startTime: dateTime.toISOString(), // TODO
            endTime: dateTime.toISOString(), // TODO
            image: imageURI,
            author: user!.uid,
            attendees: [],
            tags: []
        } satisfies Event);
    }

    return (
        <div className="h-full flex justify-center items-center relative bg-black/50 px-4 pt-32 pb-16">
            <img
                src="/banner.jpg"
                alt="Banner image"
                className="absolute inset-0 w-full h-full object-cover object-center- -z-10"
            />

            <main className="bg-white shadow-md rounded-md px-10 sm:px-16 py-10 flex flex-col w-[48rem] max-w-full">
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
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-3.5 mb-4"
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
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-3.5 mb-4"
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
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-3.5 mb-4"
                />

                <label htmlFor="dateTimePicker" className="font-semibold text-sm">
                    Event Date and Time
                </label>
                <br />
                {/*
                TODO:
                <DateTimePicker
                    id="dateTimePicker"
                    name ="dateTime"
                    onChange={setDateTime}
                    value={dateTime}
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-1"
                />
                */}

                <p className="font-semibold text-sm mb-1">Image</p>
                <label
                    htmlFor="image"
                    onDragEnter={() => setDragging(true)}
                    onDragLeave={() => setDragging(false)}
                    onDragEnd={() => setDragging(false)}
                    onDrop={() => setDragging(false)}
                    className={'relative flex flex-col items-center justify-center h-44 w-full bg-blue-400/30 text-blue-400 font-semibold rounded-md mb-4' + (dragging ? ' border-4 border-dashed border-blue-400' : '')}
                >
                    <AiOutlineDownload className="text-6xl font-bold mb-1.5" />
                    <p><strong className="font-bold">Choose a file</strong> or drop it here.</p>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // TODO: hacky?
                    />
                    <p className="text-sm">{image?.name ?? 'No file selected.'}</p>
                </label>

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
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-3.5 mb-8"
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
