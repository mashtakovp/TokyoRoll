import axios from 'axios';

import {
    ALL_ROLLS_REQUEST,
    ALL_ROLLS_SUCCESS,
    ALL_ROLLS_FAIL,
    ADMIN_ROLLS_REQUEST,
    ADMIN_ROLLS_SUCCESS,
    ADMIN_ROLLS_FAIL,
    NEW_ROLL_REQUEST,
    NEW_ROLL_SUCCESS,
    NEW_ROLL_FAIL,
    DELETE_ROLL_REQUEST,
    DELETE_ROLL_SUCCESS,
    DELETE_ROLL_FAIL,
    UPDATE_ROLL_REQUEST,
    UPDATE_ROLL_SUCCESS,
    UPDATE_ROLL_FAIL,
    ROLL_DETAILS_REQUEST,
    ROLL_DETAILS_SUCCESS,
    ROLL_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
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

export const getRolls = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_ROLLS_REQUEST })

        let link = `/api/v1/rolls?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

        if (category) {
            link = `/api/v1/rolls?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_ROLLS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ROLLS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newRoll = (rollData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_ROLL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/roll/new`, rollData, config)

        dispatch({
            type: NEW_ROLL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ROLL_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete roll (Admin)
export const deleteRoll = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ROLL_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/roll/${id}`)

        dispatch({
            type: DELETE_ROLL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ROLL_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Roll (ADMIN)
export const updateRoll = (id, rollData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ROLL_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/roll/${id}`, rollData, config)

        dispatch({
            type: UPDATE_ROLL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ROLL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getRollDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ROLL_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/roll/${id}`)

        dispatch({
            type: ROLL_DETAILS_SUCCESS,
            payload: data.roll
        })

    } catch (error) {
        dispatch({
            type: ROLL_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminRolls = () => async (dispatch) => {
    try {

        dispatch({ type: ADMIN_ROLLS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/rolls`)

        dispatch({
            type: ADMIN_ROLLS_SUCCESS,
            payload: data.rolls
        })

    } catch (error) {

        dispatch({
            type: ADMIN_ROLLS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get roll reviews
export const getRollReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`/api/v1/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete roll review
export const deleteReview = (id, rollId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`/api/v1/reviews?id=${id}&rollId=${rollId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}