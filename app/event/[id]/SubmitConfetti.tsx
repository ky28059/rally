'use client'

import {useMounted} from '@/util/useMounted';
import Confetti from 'react-confetti';


export default function SubmitConfetti(props: {run: boolean}) {
    const mounted = useMounted()
    if (!mounted) return null;

    return (
        <Confetti
            initialVelocityX={{min: -4, max: 4}}
            initialVelocityY={{min: 1, max: 4}}
            recycle={false}
            run={props.run}
            style={{position: 'fixed'}}
        />
    )
}
