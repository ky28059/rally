'use client'

import {useUser} from 'reactfire';
import {Pacifico} from 'next/font/google';

// Components
import SignInButton from '@/components/SignInButton';
import HeaderDropdown from '@/components/HeaderDropdown';
import Link from 'next/link';


const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin']
});

export default function Header() {
    const {data: user} = useUser();

    return (
        <header className="flex gap-4 px-12 bg-black/75 fixed top-0 w-full backdrop-blur-md z-20 text-white">
            <Link href="/">
                <h1 className="text-4xl pt-3 pb-5" style={pacifico.style}>
                    rally.
                </h1>
            </Link>

            <nav className="flex gap-3.5 items-center pl-4 mr-auto text-gray-400 font-light tracking-tight">
                <Link href="/map">
                    Explore
                </Link>
                <Link href="/create-event">
                    Organize
                </Link>
            </nav>

            {user ? (
                <HeaderDropdown />
            ) : (
                <SignInButton />
            )}
        </header>
    )
}
