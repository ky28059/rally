import {Fragment, ReactNode} from 'react';
import {Menu, Transition} from '@headlessui/react';


// A reusable component to wrap a "dropdown" animation around a `Menu.Items`.
export default function AnimatedMenu(props: {children: ReactNode, className?: string}) {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className={props.className}>
                {props.children}
            </Menu.Items>
        </Transition>
    )
}
