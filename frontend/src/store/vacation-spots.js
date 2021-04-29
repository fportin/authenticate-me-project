import { csrfFetch } from './csrf';

const SET_SPOT = 'SET_SPOT';
const SHOW_SPOTS = 'SHOW_SPOTS';

const setSpot = (spot) => {
    return {
        type: SET_SPOT,
        spot
    }
}

const showSpots = (allSpots) => {
    return {
        type: SHOW_SPOTS,
        allSpots
    }
}


export const createSpot = (spot) => async (dispatch) => {
    const { spotName, activities, location, pictureURL, sessionUser } = spot;
    const res = await csrfFetch("/api/spots/create", {
        method: "POST",
        body: JSON.stringify({
            spotName,
            activities,
            location,
            pictureURL,
            sessionUser
        }),
    });
    const data = await res.json();
    dispatch(setSpot(data.spot));
    return res;
};

export const getSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);
    if(res.ok) {
        const data = await res.json();
        dispatch(setSpot(data));
    }
    // return res;
};

export const getSpots = (searchWord) => async (dispatch) => {
    const res = await fetch(`/api/spots`);
    if (res.ok) {
        const data = await res.json();
        let filteredData = data;
        if (searchWord) {
            if (searchWord.trim().length) {
                filteredData = data.filter(spot => spot.spotName.toLowerCase().startsWith(searchWord?.toLowerCase()))
            } 
        }
        dispatch(showSpots(filteredData));
    }
    // return res;
};

export const updateSpot = (spot) => async (dispatch) => {
    const { spotId, spotName, activities, location, pictureURL, sessionUser } = spot;
    const res = await csrfFetch(`/api/spots/${spotId}/edit`, {
        method: "PUT",
        body: JSON.stringify({
            spotName,
            activities,
            location,
            pictureURL,
            sessionUser
        }),
    });
    const data = await res.json();
    dispatch(setSpot(data.spot));
    return res;
};

export const deleteSpot = (spot) => async (dispatch) => {
    const { spotId, sessionUser } = spot;
    const res = await csrfFetch(`/api/spots/${spotId}/delete`, {
        method: "DELETE",
        body: JSON.stringify({
            sessionUser
        }),
    });
    const data = await res.json();
    dispatch(setSpot(data.spot));
    return res;
};


const initialState = { spot: null };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SPOT:
            return {
                ...state,
                spot: action.spot
            };
        case SHOW_SPOTS:
            return {
                ...state,
                allSpots: action.allSpots
            };
        default:
            return state;
    }
};



export default spotReducer;