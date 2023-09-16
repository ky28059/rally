import type {Metadata} from 'next';
import {Pacifico} from 'next/font/google';

import Event from '@/app/Event';
import Footer from '@/components/Footer';

import {exampleEvent} from '@/app/event/[id]/page';


const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin']
});

export const metadata: Metadata = {
    description: '...'
}

export default function Home() {
    return (
        <div className="">
            <header className="py-12 bg-black/50 text-white relative">
                <img
                    src="/banner.jpg"
                    alt="Banner image"
                    className="absolute inset-0 w-full h-full object-cover object-center- -z-10"
                />
                <div className="container">
                    <h1 className="text-6xl mb-6" style={pacifico.style}>rally.</h1>
                    join events please join events please join events please join events please join events
                    please join events please join events please join events please join events please join events
                    please join events please join events please join events please join events please join events
                </div>
            </header>

            <section className="container grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] xl:grid-cols-4 gap-4 py-8">
                <Event {...exampleEvent} />
                <Event {...exampleEvent} />
                <Event {...exampleEvent} />
                <Event {...exampleEvent} />
                <Event {...exampleEvent} />
                <Event {...exampleEvent} />
                <Event {...exampleEvent} />
            </section>

            <Footer />
        </div>
    )
}
