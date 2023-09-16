import type {Metadata} from 'next';
import Events from '@/app/Events';
import Footer from '@/components/Footer';


export const metadata: Metadata = {
    description: '...'
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
                <div className="container">
                    join events please join events please join events please join events please join events
                    please join events please join events please join events please join events please join events
                    please join events please join events please join events please join events please join events
                </div>
            </section>

            <Events />

            <Footer />
        </div>
    )
}
