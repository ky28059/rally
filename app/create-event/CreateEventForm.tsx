'use client'

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Combobox} from '@headlessui/react';
import {DateTime} from 'luxon';
import {AiOutlineDownload} from 'react-icons/ai';
import type {Event} from '@/util/events';

// Firebase
import {useFirestore, useFirestoreCollectionData, useStorage, useUser} from 'reactfire';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {doc, collection, setDoc} from 'firebase/firestore';

// Components
import AnimatedCombobox from '@/components/AnimatedCombobox';
import AutoResizingTextArea from '@/components/AutoResizingTextArea';
import DateTimePicker from '@/components/DateTimePicker';
import TagSelector from '@/app/create-event/TagSelector';


export default function CreateEventForm() {
    const storage = useStorage();
    const firestore = useFirestore();
    const {status, data: user} = useUser();

    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const [building, setBuilding] = useState('');
    const [query, setQuery] = useState('')
    const [location, setLocation] = useState('');

    const {data: buildings} = useFirestoreCollectionData(collection(firestore, 'buildings'));
    const filtered = buildings?.filter(data => data.name.toLowerCase().includes(query.toLowerCase())
        || data.abbr.toLowerCase().includes(query.toLowerCase()));

    const [startDate, setStartDate] = useState(DateTime.now());
    const [endDate, setEndDate] = useState(DateTime.now().plus({hours: 1}));

    const [tags, setTags] = useState<string[]>([]);

    const [dragging, setDragging] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);

    const {push} = useRouter();

    function updateStartDate(date: DateTime) {
        setStartDate(date);
        if (date.valueOf() >= endDate.valueOf()) setEndDate(date.plus({hours: 1}));
    }

    useEffect(() => {
        if (status !== 'success') return;
        if (!user) push('/auth-required?redirectTo=/create-event');
    }, [status])

    async function createEvent() {
        setLoading(true)
        const {id} = await (await fetch('/api/uuid')).json();

        let imageURI = null;
        if (image) {
            const reference = ref(storage, `images/${id}.${image.type}`);
            await uploadBytes(reference, image);
            imageURI = await getDownloadURL(reference);
        }

        await setDoc(doc(firestore, 'events', id), {
            id,
            title,
            desc,
            location: building && location ? `${building} ${location}` : building ? building : location,
            startTime: startDate.toISO()!,
            endTime: endDate.toISO()!,
            image: imageURI,
            author: user!.uid,
            attendees: [],
            tags
        } satisfies Event);

        push('/#events');
    }

    return (
        <>
            <label htmlFor="title" className="font-semibold text-sm">
                Title
            </label>
            <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of event"
                required
                className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-3.5 mb-4"
            />

            <label htmlFor="tags" className="font-semibold text-sm">
                Tags (max. 10)
            </label>
            <TagSelector
                tags={tags}
                setTags={setTags}
            />

            <label htmlFor="desc" className="font-semibold text-sm">
                Description
            </label>
            <AutoResizingTextArea
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
            <div className="flex gap-1 mb-4">
                <Combobox as="div" className="relative" value={building} onChange={setBuilding}>
                    <Combobox.Input
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="WALC"
                        className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-3.5"
                    />
                    <AnimatedCombobox className="absolute left-0 top-full z-50 bg-white shadow-lg py-2 rounded-md w-max">
                        {filtered?.slice(0, 5).map(data => (
                            <Combobox.Option value={data.abbr} key={data.abbr} className="cursor-pointer px-4 hover:bg-gray-100 transition duration-100 py-1">
                                {data.name} ({data.abbr})
                            </Combobox.Option>
                        ))}
                    </AnimatedCombobox>
                </Combobox>

                <input
                    type="text"
                    name="location"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="6049"
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-3.5"
                />
            </div>

            <label htmlFor="dateTimePicker" className="font-semibold text-sm">
                Event Date and Time
            </label>

            <div className="flex gap-2 text-sm items-center pl-2 mb-1">
                Start time:
                <DateTimePicker
                    date={startDate}
                    setDate={updateStartDate}
                />
            </div>

            <div className="flex gap-2 text-sm items-center pl-2 mb-4">
                End time:
                <DateTimePicker
                    date={endDate}
                    setDate={setEndDate}
                    earliestDate={startDate}
                />
            </div>

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

            <button
                onClick={createEvent}
                className= "rounded font-semibold px-4 py-1.5 bg-yellow-400 hover:shadow-md hover:shadow-yellow-600 transition duration-200 disabled:opacity-50 hover:disabled:shadow-none"
                disabled={loading}
            >
                Create event
            </button>
        </>
    )
}
