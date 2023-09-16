'use client'

import {useEffect, useState} from 'react';
import Confetti from 'react-confetti';


export default function SubmitConfetti() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return (
        <Confetti
            initialVelocityX={{min: -4, max: 4}}
            initialVelocityY={{min: 1, max: 4}}
            recycle={false}
        />
    )
}
