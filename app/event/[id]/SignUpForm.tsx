'use client'

import {useEffect, useState} from 'react';


export default function SignUpForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <>
            <h5 className="mt-4 font-semibold mb-2">
                Sign up for this event
            </h5>
            <form>
                <label htmlFor="firstName" className="font-semibold text-sm">
                    First name
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-1"
                />

                <label htmlFor="lastName" className="font-semibold text-sm">
                    Last name
                </label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Javascript"
                    required
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-1"
                />

                <label htmlFor="email" className="font-semibold text-sm">
                    Email (optional)
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="javascript47@purdue.edu"
                    className="border border-gray-300 rounded focus:outline-none focus-visible:ring-2 py-1 px-4 mb-4"
                />
                <button
                    className="rounded font-semibold px-4 py-1.5 bg-yellow-400 hover:shadow-md hover:shadow-yellow-600 transition duration-200"
                >
                    Sign up
                </button>
            </form>
        </>
    )
}
