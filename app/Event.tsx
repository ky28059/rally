'use client'

import {useState} from 'react';
import CenteredModal from '@/components/CenteredModal';
import type {Event} from '@/app/event/[id]/page';


export default function Event(props: Event) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className="flex flex-col rounded-lg border border-gray-400 hover:border-gray-600 transition duration-200 w-72 cursor-pointer overflow-clip"
                onClick={() => setOpen(true)}
            >
                <img
                    src={props.image}
                    alt="..."
                    className="w-full h-48 object-cover object-center"
                />
                <div className="px-5 pt-3 pb-4">
                    <h3 className="font-semibold">{props.title}</h3>
                    <p className="text-sm">{props.desc}</p>
                </div>
            </div>

            <CenteredModal isOpen={open} setIsOpen={setOpen} className="relative flex flex-col bg-white rounded-md w-[40rem] max-h-[90%] mx-2 py-6 px-10 shadow-xl">
                <h1 className="font-bold text-4xl mb-3">
                    {props.title}
                </h1>
                {props.desc}
            </CenteredModal>
        </>
    )
}
