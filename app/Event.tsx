'use client'

import {useState} from 'react';
import {DateTime} from 'luxon';
import CenteredModal from '@/components/CenteredModal';
import {Event} from '@/util/events';
import Link from 'next/link';


export default function Event(props: Event) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className={'flex flex-col rounded-lg border border-gray-400 hover:border-gray-600 hover:shadow-2xl hover:scale-[1.02] transition duration-200 cursor-pointer overflow-clip' + (open ? ' shadow-2xl scale-[1.02]' : '')}
                onClick={() => setOpen(true)}
            >
                <img
                    src={props.image}
                    alt="..."
                    className="w-full h-48 object-cover object-center"
                />
                <div className="px-5 pt-3 pb-4">
                    <div className="flex flex-wrap gap-x-4 justify-between mb-1">
                        <h3 className="font-semibold">{props.title}</h3>
                        <div className="text-xs font-semibold bg-gray-100 text-gray-700 rounded py-1 px-2">
                            {DateTime.fromISO(props.time).toLocaleString(DateTime.DATETIME_SHORT)}
                        </div>
                    </div>
                    {props.tags.length !== 0 && (
                        <div className="flex gap-1 mb-1.5">
                            {props.tags.map(tag => (
                                <div className="rounded-full text-xs py-0.5 px-1.5 bg-blue-400/30 text-blue-400 w-max font-semibold">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                    <p className="text-sm line-clamp-1">{props.desc}</p>
                </div>
            </div>

            <CenteredModal isOpen={open} setIsOpen={setOpen} className="relative flex flex-col bg-white rounded-md w-[40rem] max-h-[90%] mx-2 py-6 px-10 shadow-xl">
                <h1 className="font-bold text-4xl mb-3">
                    {props.title}
                </h1>
                <div className="grid grid-cols-[8rem,_1fr] mb-3 gap-y-1">
                    <strong className="text-gray-700">Date:</strong>
                    <div>
                        {DateTime.fromISO(props.time).toLocaleString(DateTime.DATETIME_FULL)}
                    </div>

                    {props.location && (<>
                        <strong className="text-gray-700">Location:</strong>
                        <div>{props.location}</div>
                    </>)}

                    {props.tags.length !== 0 && (<>
                        <strong className="text-gray-700">Tags:</strong>
                        <div className="flex gap-1">
                            {props.tags.map(tag => (
                                <div className="rounded-full text-xs py-1 px-2 bg-blue-400/30 text-blue-400 w-max font-semibold">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </>)}
                </div>

                {props.desc}

                <Link href={`/event/${props.id}`} className="mt-3 focus:outline-none text-gray-600 hover:underline text-right">
                    More info --{'>'}
                </Link>
            </CenteredModal>
        </>
    )
}
