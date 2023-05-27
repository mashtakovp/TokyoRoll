import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import '../../App.css'
import Search from './Search'
import { logout } from "../../actions/userActions";
const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        alert.success("Logged out successfully");
      };
    const { cartItems } = useSelector(state => state.cart)
    const { user, loading } = useSelector(state => state.auth)
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/logo.png" />
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search />
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span className="ml-1" id="cart_count">Корзина: {cartItems.length}</span>
                    </Link>
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-3" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    <img src={user.avatar && user.avatar.url} alt={user && user.name}
                                        className="rounded-circle" />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                     <Link className="dropdown-item" to="/dashboard"> Панель администратора </Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me"> Заказы </Link>
                                <Link className="dropdown-item" to="/me"> Профиль </Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Выйти
                                </Link>
                            </div>
                        </div>
                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Войти</Link>}

                </div>
            </nav>
        </Fragment>
    )
}

export default Header