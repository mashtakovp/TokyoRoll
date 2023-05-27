import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRollReviews, deleteReview, clearErrors } from '../../actions/rollActions'
import { DELETE_REVIEW_RESET } from '../../constants/rollConstants'

const RollReviews = () => {

    const [rollId, setRollId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector(state => state.rollReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (rollId !== '') {
            dispatch(getRollReviews(rollId))
        }

        if (isDeleted) {
            alert.success('Review deleted successfully');
            dispatch({ type: DELETE_REVIEW_RESET })
        }



    }, [dispatch, alert, error, rollId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, rollId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getRollReviews(rollId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'roll Reviews'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="rollId_field">Enter roll ID</label>
                                        <input
                                            type="text"
                                            id="rollId_field"
                                            className="form-control"
                                            value={rollId}
                                            onChange={(e) => setRollId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        SEARCH
								    </button>
                                </ form>
                            </div>

                        </div>

                        {reviews && reviews.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                                <p className="mt-5 text-center">No Reviews.</p>
                            )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default RollReviews
