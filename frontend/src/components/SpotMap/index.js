import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


import * as spotActions from '../../store/vacation-spots'
import './SpotMap.css'


const SpotMap = ({ location }) => {
    const dispatch = useDispatch();
    const currentSpot = useSelector((state) => state.places.spot);

   
    return (
        // <div >
        //     </div>
        <MapContainer className='spot-map__container' center={[33.813651199999995, -117.91973507032726]} zoom={20} scrollWheelZoom={false}>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[33.813651199999995, -117.91973507032726]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default SpotMap