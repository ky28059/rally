import type {ReactNode} from 'react';
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import FirebaseProviders from '@/components/FirebaseProviders';
import Header from '@/components/Header';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
    title: {
        template: '%s | rally.',
        absolute: 'rally.'
    }
}

export default function Layout(props: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full scroll-smooth">
            <body className={inter.className + ' relative flex flex-col h-full'}>
                <FirebaseProviders>
                    <Header />
                    <div className="flex-grow">
                        {props.children}
                    </div>
                </FirebaseProviders>
            </body>
        </html>
    )
}
