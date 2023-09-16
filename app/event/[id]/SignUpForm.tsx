'use client'

import {useEffect, useState} from 'react';


export default function SignUpForm() {
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
                    id="firstName"
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
                <button className="rounded font-semibold px-4 py-1.5 bg-gradient-to-br from-yellow-300 via-orange-400 to-yellow-500 hover:shadow-md hover:shadow-yellow-600 transition duration-200">Sign up</button>
            </form>
        </>
    )
}
