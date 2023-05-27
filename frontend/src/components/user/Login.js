import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useNavigate, useLocation } from "react-router-dom";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userActions";

const Login= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, alert, isAuthenticated, error, redirect]);

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <Fragment>
      {loading ?  <Loader /> : (
        <Fragment>
          <MetaData title= {"Login"} />

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mb-3">Вход</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Почта</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Пароль</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Link to="/password/forgot" className="float-right mb-4">
                  Забыли пароль?
                </Link>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  ЛОГИН
                </button>

                <Link to="/register" className="float-right mt-3">
                  Нет аккаунта?
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default Login