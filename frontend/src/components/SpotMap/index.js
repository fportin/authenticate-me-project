import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


import * as spotLocationActions from '../../store/spot-location'
import './SpotMap.css'


const SpotMap = () => {
    const dispatch = useDispatch();
    const currentSpot = useSelector((state) => state.places.spot);
    const currentLocation = useSelector((state) => state.locations.location);

    useEffect(() => {
        dispatch(spotLocationActions.getSpotLocation(currentSpot.id))
        console.log('I happened for SpotMap index.js')
    }, [dispatch, currentSpot])
    
    if (currentSpot && currentLocation) {
        if (currentSpot.location === currentLocation.location) {
            const { coordinates, location } = currentLocation
            
            return (
                // <div >
                //     </div>
                <MapContainer className='spot-map__container' center={coordinates} zoom={7} scrollWheelZoom={false}>
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={coordinates}>
                        <Popup>
                            {location} <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            )

        }
        
    }
    return (<></>);
    
}

export default SpotMap