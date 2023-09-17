import type {Metadata} from 'next';
import SignInButton from '@/components/SignInButton';


export const metadata: Metadata = {
    title: 'Authentication required'
}

export default function AuthRequired() {
    return (
        <div className="h-full flex justify-center items-center relative px-4 pt-32 pb-16 bg-[url('/banner.jpg')] bg-cover bg-center bg-fixed">
            <div className="absolute inset-0 bg-black/50 w-full h-full" />

            <main className="bg-white shadow-md rounded-md px-10 sm:px-16 pt-10 pb-6 flex flex-col w-[48rem] max-w-full z-10">
                <h5 className="text-3xl font-bold mb-4">
                    This page requires authentication to use!
                </h5>
                <p>Please log in using the button below and try again.</p>
                <SignInButton />
            </main>
        </div>
    )
}
