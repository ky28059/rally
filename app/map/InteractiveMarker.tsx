import {useState} from 'react';
import type {Event as EventProps} from '@/util/events'
import {InfoWindow, Marker} from '@react-google-maps/api';
import Event from '@/components/Event';

type InteractiveMarkerProps = {
    event: EventProps,
    position: {lat: number, lng: number}
    openId: string,
    setOpenId: (openId: string) => void
}

export default function InteractiveMarker(props: InteractiveMarkerProps) {
    return (<>
            <Marker
                key={props.event.id}
                position={props.position}
                title={props.event.title}
                onClick={() => props.setOpenId(props.event.id)}
            >
                {props.openId == props.event.id && <InfoWindow onCloseClick={() => props.setOpenId("")}>
                    <Event {...props.event} ></Event>
                </InfoWindow>}
            </Marker>
        </>)
}