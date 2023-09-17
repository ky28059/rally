import Link from 'next/link';


export default function NotFound() {
    return (
        <div className="h-full flex justify-center items-center relative px-4 pt-32 pb-16 bg-[url('/banner.jpg')] bg-cover bg-center bg-fixed">
            <div className="absolute inset-0 bg-black/50 w-full h-full" />

            <main className="bg-white shadow-md rounded-md px-10 sm:px-16 py-10 flex flex-col w-[48rem] max-w-full z-10">
                <h5 className="text-3xl font-bold mb-4">
                    404.
                </h5>
                <p>Your requested page was not found.</p>
                <Link href="/" className="text-gray-700 hover:underline">Go home?</Link>
            </main>
        </div>
    )
}
