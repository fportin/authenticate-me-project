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

// const removeUser = () => {
//     return {
//         type: REMOVE_USER,
//     }
// }


// export const login = (user) => async (dispatch) => {
//     const { credential, password } = user;
//     const res = await csrfFetch('/api/session', {
//         method: 'POST',
//         body: JSON.stringify({
//             credential,
//             password
//         })
//     })

//     const data = await res.json();
//     dispatch(setUser(data.user));
//     return res;
// };

// export const restoreUser = () => async dispatch => {
//     const res = await csrfFetch('/api/session');
//     const data = await res.json();
//     dispatch(setUser(data.user));
//     return res;
// };

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

// export const logout = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//         method: 'DELETE',
//     });
//     dispatch(removeUser());
//     return response;
// };

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