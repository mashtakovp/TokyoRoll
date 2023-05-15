import {
    ALL_ROLLS_REQUEST,
    ALL_ROLLS_SUCCESS,
    ALL_ROLLS_FAIL,
    ADMIN_ROLLS_REQUEST,
    ADMIN_ROLLS_SUCCESS,
    ADMIN_ROLLS_FAIL,
    NEW_ROLL_REQUEST,
    NEW_ROLL_SUCCESS,
    NEW_ROLL_RESET,
    NEW_ROLL_FAIL,
    DELETE_ROLL_REQUEST,
    DELETE_ROLL_SUCCESS,
    DELETE_ROLL_RESET,
    DELETE_ROLL_FAIL,
    UPDATE_ROLL_REQUEST,
    UPDATE_ROLL_SUCCESS,
    UPDATE_ROLL_RESET,
    UPDATE_ROLL_FAIL,
    ROLL_DETAILS_REQUEST,
    ROLL_DETAILS_SUCCESS,
    ROLL_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS

} from '../constants/rollConstants'

export const rollsReducer = (state = { rolls: [] }, action) => {
    switch (action.type) {
        case ALL_ROLLS_REQUEST:
        case ADMIN_ROLLS_REQUEST:
            return {
                loading: true,
                rolls: []
            }

        case ALL_ROLLS_SUCCESS:
            return {
                loading: false,
                rolls: action.payload.rolls,
                rollsCount: action.payload.rollsCount,
                resPerPage: action.payload.resPerPage,
                filteredRollsCount: action.payload.filteredRollsCount
            }

        case ADMIN_ROLLS_SUCCESS:
            return {
                loading: false,
                rolls: action.payload
            }

        case ALL_ROLLS_FAIL:
        case ADMIN_ROLLS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const newRollReducer = (state = { roll: {} }, action) => {
    switch (action.type) {

        case NEW_ROLL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ROLL_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                roll: action.payload.roll
            }

        case NEW_ROLL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_ROLL_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const rollReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ROLL_REQUEST:
        case UPDATE_ROLL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ROLL_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ROLL_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_ROLL_FAIL:
        case UPDATE_ROLL_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_ROLL_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_ROLL_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const rollDetailsReducer = (state = { roll: {} }, action) => {
    switch (action.type) {

        case ROLL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ROLL_DETAILS_SUCCESS:
            return {
                loading: false,
                roll: action.payload
            }

        case ROLL_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const rollReviewsReducer = (state = { review: [] }, action) => {
    switch (action.type) {

        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_REVIEWS_SUCCESS:
            return {
                loading: false,
                reviews: action.payload
            }

        case GET_REVIEWS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const reviewReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}