'use client'

import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import {collection, doc} from 'firebase/firestore';
import {useFirestore, useFirestoreCollectionData, useFirestoreDocData} from 'reactfire';

export default function Home(){
    const firestore = useFirestore();
    const {data: events} = useFirestoreCollectionData(collection(firestore, 'events'));


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
        >
            {events && events.map((event, index) => {
                console.log(location);
                const lat = event.location[1];
                const lng = event.location[2];
                return (
                    <Marker
                        key={index}
                        position={{ lat, lng }}
                        label={event.title}
                    />
                );
            })}
        </GoogleMap>
    );
}
