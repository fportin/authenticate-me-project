import { csrfFetch } from './csrf';

const SET_REVIEW = 'SET_REVIEW';
const SHOW_REVIEW = 'SHOW_REVIEW';

const setReview = (review) => {
    return {
        type: SET_REVIEW,
        review
    }
}

const showReviews = (allReviews) => {
    return {
        type: SHOW_REVIEW,
        allReviews
    }
}


export const createReview = (spot) => async (dispatch) => {
    const { reviewBody, sessionUser, currentSpot } = spot;
    const userId = sessionUser.id;
    const spotId = currentSpot.id;
    console.log('user', userId, 'spot', spotId, 'review', reviewBody)
    const res = await csrfFetch(`/api/reviews/create`, {
        method: "POST",
        body: JSON.stringify({
            reviewBody,
            userId,
            spotId
        }),
    });
    const data = await res.json();
    dispatch(setReview(data.review));
    return res;
};

export const getReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${spotId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(showReviews(data));
    }
    // return res;
};

export const updateReview = (spot) => async (dispatch) => {
    const { reviewBody, sessionUser, currentSpot, target } = spot;
    const userId = sessionUser.id;
    const spotId = currentSpot.id;
    const res = await csrfFetch(`/api/reviews/${spotId}/edit`, {
        method: "PUT",
        body: JSON.stringify({
            reviewBody,
            userId,
            target
        }),
    });
    const data = await res.json();
    dispatch(setReview(data.review));
    return res;
};

export const deleteReview = (spot) => async (dispatch) => {
    const { currentSpot, sessionUser, target } = spot;
    const spotId = currentSpot.id
    const res = await csrfFetch(`/api/reviews/${spotId}/delete`, {
        method: "DELETE",
        body: JSON.stringify({
            sessionUser,
            target
        }),
    });
    const data = await res.json();
    dispatch(setReview(data.review));
    return res;
};


const initialState = { review: null };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEW:
            return {
                ...state,
                review: action.review
            };
        case SHOW_REVIEW:
            return {
                ...state,
                allReviews: action.allReviews
            };
        default:
            return state;
    }
};



export default reviewReducer;