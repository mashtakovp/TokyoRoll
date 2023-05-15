import React, { Fragment, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRollDetails, clearErrors } from '../../actions/rollActions'
import { addItemToCart } from '../../actions/cartActions';
const RollDetails = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, roll } = useSelector(state => state.rollDetails)
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        dispatch(getRollDetails(params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, params.id])

    const addToCart = () => {
        dispatch(addItemToCart(params.id, quantity));
        alert.success('Продукт добавлен в корзину')
    }
    const increaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber >= roll.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if(count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
        
    }
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={roll.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {roll.images && roll.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100" src={image.url} alt={roll.title}/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{roll.name}</h3>
                            <p id="product_id">Товар №  {roll._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${roll.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({roll.numOfReviews} Отзывов)</span>

                            <hr />

                            <p id="product_price">{roll.price}₽</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={roll.stock === 0} onClick={addToCart}>Добавить в корзину</button>

                            <hr />

                            <p><span id="stock_status" className={roll.stock > 0 ? 'greenColor' : 'redColor'}>{roll.stock > 0 ? 'Доступно для заказа' : 'В данный момент недоступно для заказа'}</span></p>

                            <hr />

                            <h4 className="mt-2">Описание:</h4>
                            <p>{roll.description}</p>
                            <hr />
                            <p id="product_seller mb-3"><strong>{roll.seller}</strong></p>

                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Оставить отзыв
                            </button>

                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review" id="review" className="form-control mt-3">

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div >
                </Fragment>
            )}
        </Fragment>
    )
}

export default RollDetails