// Map.js
import React from 'react';
import GoogleMap from '@react-google-maps/api';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map() {
    const defaultProps = {
        center: {
            lat: 40.7446790,
            lng: -73.9485420
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={40.7473310}
                    lng={-73.9868630}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}
