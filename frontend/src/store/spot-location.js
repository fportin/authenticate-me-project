import { csrfFetch } from './csrf';
import { OpenStreetMapProvider } from 'leaflet-geosearch'

const SET_COORDINATES = 'SET_COORDINATES'


const setCoordinates = (location) => {
    return {
        type: SET_COORDINATES,
        location
    }
}


export const createSpotLocation = (address) => async(dispatch) => {
    let { id, location } = address
    let coordinates = []
    const spotId = id
    const provider = new OpenStreetMapProvider()
    provider.search({ query: location }).then( async (res) => {
        
        if (res.length >= 1) {
            const { y, x } = res[0]
            coordinates.push(y)
            coordinates.push(x)
        } else {
            coordinates = [33.813651199999995, -117.91973507032726]
            location = 'Please enter a valid address to get map location'
        }
        
        const response = await csrfFetch('/api/spot-locations/create', {
            method: "POST",
            body: JSON.stringify({
                location,
                coordinates,
                spotId
            })
        })

        const data = await response.json()
        dispatch(setCoordinates(data.spotLocation))
    })
}

export const getSpotLocation = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spot-locations/${spotId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(setCoordinates(data));
    }
    // return res;
};

export const updateSpotLocation = (address) => async (dispatch) => {
    let { id, location } = address
    let coordinates = []
    const spotId = id
    const provider = new OpenStreetMapProvider()
    provider.search({ query: location }).then(async (res) => {

        if (res.length >= 1) {
            const { y, x } = res[0]
            coordinates.push(y)
            coordinates.push(x)
        } else {
            coordinates = [33.813651199999995, -117.91973507032726]
            location = 'Please enter a valid address to get map location'
        }

        const response = await csrfFetch(`/api/spot-locations/${spotId}/update`, {
            method: "PUT",
            body: JSON.stringify({
                location,
                coordinates,
                spotId
            })
        })

        const data = await response.json()
        dispatch(setCoordinates(data.updatedLoc))
    })
}

const initialState = { location: null}

const spotLocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COORDINATES:
            return {
                ...state,
                location: action.location
            }
        default:
            return state;
    }
}


export default spotLocationReducer;