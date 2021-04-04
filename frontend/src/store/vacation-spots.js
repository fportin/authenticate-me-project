import { csrfFetch } from './csrf';

const SET_SPOT = 'SET_SPOT';
const SHOW_SPOT = 'SHOW_SPOT';

const setSpot = (spot) => {
    return {
        type: SET_SPOT,
        spot
    }
}

const showSpot = (spot) => {
    return {
        type: SHOW_SPOT,
        spot
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
        case SHOW_SPOT:
            return {
                ...state,
                spot: action.spot
            };
        default:
            return state;
    }
};



export default spotReducer;