"use client"

import InteractiveMarker from '@/app/map/InteractiveMarker';
import type { Building, Event } from '@/util/events';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { collection } from 'firebase/firestore';
import { useState } from 'react';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';


export default function InteractiveMap() {
    const firestore = useFirestore();
    const { data: events } = useFirestoreCollectionData(collection(firestore, 'events'));
    const { data: buildings } = useFirestoreCollectionData(collection(firestore, 'buildings'));

    const [openBuilding, setOpenBuilding] = useState('');

    const options = {
        styles: [
            {
                featureType: "all",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
            },
        ],
    }

    const mapContainerStyle = {
        height: "100vh",
        width: "100%",
    }

    const center = {
        lat: 40.4237,
        lng: -86.9212,
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    })

    function groupEvents(events: Event[]) {
        const locs: Map<Building, Event[]> = new Map();

        events.forEach(event => {
            if (!event.location) return;
            const locationFirst = event.location.split(' ')[0].toLowerCase();
            const buildingMatch = buildings?.find(building =>
                building.name.toLowerCase() === locationFirst
                || building.abbr.toLowerCase() === locationFirst
            ) as Building | undefined;
            if (buildingMatch) {
                if (!locs.has(buildingMatch)) locs.set(buildingMatch, []);
                locs.get(buildingMatch)?.push(event);
            }
        })

        return locs;
    }

    if (!isLoaded) return <div> Loading....</div>
    return (
        <GoogleMap
            zoom={15}
            mapContainerStyle={mapContainerStyle}
            center={center}
            options={options}
            onClick={() => setOpenBuilding('')}
        >
            {events && [...groupEvents(events as Event[]).entries()].map(([loc, events]) => (
                <InteractiveMarker
                    key={loc.abbr}
                    building={loc}
                    events={events}
                    openBuilding={openBuilding}
                    setOpenBuilding={setOpenBuilding}
                />
            ))}
        </GoogleMap>
    )
}
