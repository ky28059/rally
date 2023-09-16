'use client'

import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function Home(){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });
    if (!isLoaded) return <div> Loading....</div>;
        return <Map />
}

function Map(){
    return (
        <GoogleMap zoom={13} center={{lat:40.4237,lng:-86.9212}} mapContainerClassName="h-screen w-full">
            
            
        <Marker position={{lat:44, lng:-80}}/>
        </GoogleMap>
    );
}
