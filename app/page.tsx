import type {Metadata} from 'next';
import {exampleEvent} from '@/util/events';

import Event from '@/app/Event';
import Footer from '@/components/Footer';
import Header from '@/components/Header';


export const metadata: Metadata = {
    description: '...'
}

export default function Home() {
    return (
        <div className="">
            <Header />

            <header className="py-12 bg-black/50 text-white relative">
                <img
                    src="/banner.jpg"
                    alt="Banner image"
                    className="absolute inset-0 w-full h-full object-cover object-center- -z-10"
                />
                <div className="container">
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
