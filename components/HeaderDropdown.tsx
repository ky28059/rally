'use client'

import {MouseEventHandler, ReactNode} from 'react';
import Link from 'next/link';
import {useAuth, useUser} from 'reactfire';
import {signOut} from 'firebase/auth';
import {Menu} from '@headlessui/react';
import AnimatedMenu from '@/components/AnimatedMenu';


export default function HeaderDropdown() {
    const auth = useAuth()
    const {data: user} = useUser();

    return (
        <Menu as="div" className="relative flex">
            <Menu.Button className="px-3 py-4 hover:bg-white/10 transition duration-200">
                {user?.displayName}
            </Menu.Button>
            <AnimatedMenu className="absolute right-0 top-full origin-top-right bg-black py-1.5 rounded-l rounded-br w-48 shadow-xl z-10">
                <Link href={`/profile/${user?.uid}`}>
                    <HeaderDropdownItem>
                        Profile
                    </HeaderDropdownItem>
                </Link>
                <HeaderDropdownItem onClick={() => signOut(auth)}>
                    Sign out
                </HeaderDropdownItem>
            </AnimatedMenu>
        </Menu>
    )
}

function HeaderDropdownItem(props: {children: ReactNode, onClick?: MouseEventHandler<HTMLDivElement>}) {
    return (
        <Menu.Item
            as="div"
            className="flex gap-2.5 items-center px-4 py-1 cursor-pointer text-primary hover:text-white hover:bg-white/10 group"
            onClick={props.onClick}
        >
            {props.children}
        </Menu.Item>
    )
}
