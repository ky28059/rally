import type {Metadata} from 'next';
import Events from '@/app/Events';
import Footer from '@/components/Footer';
import {BsChevronCompactDown} from 'react-icons/bs';


export const metadata: Metadata = {
    description: 'Rally is the ultimate platform for Purdue students looking to connect, engage, and discover new experiences. From study groups to sports events, movie nights to sexual education workshops, Rally is your go-to hub for all things campus life.'
}

export default function Home() {
    return (
        <div>
            <section className="pt-36 pb-16 bg-black/50 text-white relative">
                <img
                    src="/banner.jpg"
                    alt="Banner image"
                    className="absolute inset-0 w-full h-full object-cover object-center- -z-10"
                />
                <div className="container flex flex-col">
                    <h1 className="text-4xl font-bold mb-2">
                        Explore Purdue. Find events that interest you.
                    </h1>
                    <p>
                        Rally is the ultimate platform for Purdue students looking to connect, engage, and discover new
                        experiences. From study groups to sports events, movie nights to club callouts, Rally is your
                        go-to hub for all things campus life.
                    </p>
                    <a href="#events" className="text-inherit text-4xl w-full mt-2 flex justify-center">
                        <BsChevronCompactDown className="animate-bounce" />
                        <span className="sr-only">Jump to Events</span>
                    </a>
                </div>
            </section>

            <Events />

            <Footer />
        </div>
    )
}
