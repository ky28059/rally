import Event from '@/app/Event';


export default function Home() {
    return (
        <div className="">
            <header>
                banner todo
            </header>
            <section className="container flex flex-wrap gap-2">
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
                <Event />
            </section>
        </div>
    )
}
