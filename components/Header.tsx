'use client'

import {useUser} from 'reactfire';
import {Pacifico} from 'next/font/google';

// Components
import SignInButton from '@/components/SignInButton';
import HeaderDropdown from '@/components/HeaderDropdown';


const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin']
});

export default function Header() {
    const {data: user} = useUser();

    return (
        <header className="flex gap-4 justify-between px-12 bg-black text-white">
            <h1 className="text-4xl py-4" style={pacifico.style}>
                rally.
            </h1>

            {user ? (
                <HeaderDropdown />
            ) : (
                <SignInButton />
            )}
        </header>
    )
}
