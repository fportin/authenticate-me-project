import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import * as ELGeo from 'esri-leaflet-geocoder'

import './SpotMap.css'


const SpotMap = () => {

    return (
        <div className='spot-map__container'>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer 
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default SpotMap