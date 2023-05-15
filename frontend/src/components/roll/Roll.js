import React from 'react'
import { Link } from 'react-router-dom'

const Roll = ({ roll, col }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={roll.images[0].url}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/roll/${roll._id}`}>{roll.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${roll.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">{roll.numOfReviews} Отзывов</span>
                    </div>
                    <p className="card-text">{roll.price} ₽</p>
                    <Link to={`/roll/${roll._id}`} id="view_btn" className="btn btn-block">Показать детали</Link>
                </div>
            </div>
        </div>
    )
}

export default Roll