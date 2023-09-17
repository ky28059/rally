'use client'

import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import {collection, doc} from 'firebase/firestore';
import {useFirestore, useFirestoreCollectionData, useFirestoreDocData} from 'reactfire';
import InteractiveMarker from '@/app/map/InteractiveMarker';
import type {Event} from '@/util/events'
import {useState} from 'react';


export default function Map(){
    const firestore = useFirestore();
    const {data: events} = useFirestoreCollectionData(collection(firestore, 'events'));
    const {data: buildings} = useFirestoreCollectionData(collection(firestore, 'buildings'));

    const [openId, setOpenId] = useState("")

    const options = {
        styles: [
            {
                featureType: 'all',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
            },
        ],
    };

    const mapContainerStyle = {
        height: '100vh',
        width: '100%',
    };

    const center = {
        lat: 40.4237,
        lng: -86.9212,
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    if (!isLoaded) return <div> Loading....</div>;
    return (
        <GoogleMap
            zoom={15}
            mapContainerStyle={mapContainerStyle}
            center={center}
            options={options}
            onClick={() => setOpenId("")}
        >
            {events && events.map((event, index) => {
                if (!event.location) return
                // Check if the location matches a building/building abbreviation
                const locationFirst = event.location.split(" ")[0].toLowerCase()
                const buildingMatch = buildings?.find(building => building.name.toLowerCase() === locationFirst || building.abbr.toLowerCase() === locationFirst)
                if (buildingMatch) return (
                    <InteractiveMarker
                        position={{ lat: buildingMatch.lat, lng: buildingMatch.lng }}
                        event={event as Event}
                        openId={openId}
                        setOpenId={setOpenId}
                    />
                )
                return
            })}
        </GoogleMap>
    );
}
