import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import RollDetails from './components/roll/RollDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import { loadUser } from './actions/userActions'
import store from './store'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import Cart from './components/cart/Cart'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import Shipping from './components/cart/Shipping'
import OrderSuccess from './components/cart/OrderSuccess'
import axios from 'axios'
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'
import Dashboard from './components/admin/Dashboard'
import RollsList from './components/admin/RollsList'
import NewRoll from './components/admin/NewRoll'
import UpdateRoll from './components/admin/UpdateRoll'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import RollReviews from './components/admin/RollReviews'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/roll/:id" element={<RollDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
            <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route path="/confirm" element={<ConfirmOrder />} />
            {stripeApiKey &&
              <Route path="/payment"
                element={<ProtectedRoute>
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements></ProtectedRoute>
                }
              />
            }
            <Route path="/success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
            <Route path="/orders/me" element={<ProtectedRoute><ListOrders /></ProtectedRoute>} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            </Routes>
      </div>
      <Routes>
            <Route path="/admin/rolls" isAdmin={true} element={<ProtectedRoute><RollsList /></ProtectedRoute>} />
            <Route path="/admin/roll" isAdmin={true} element={<ProtectedRoute><NewRoll /></ProtectedRoute>} />
            <Route path="/dashboard" isAdmin={true} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/roll/:id" isAdmin={true} element={<ProtectedRoute><UpdateRoll /></ProtectedRoute>} />
            <Route path="/admin/order/:id" isAdmin={true} element={<ProtectedRoute><ProcessOrder /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><OrdersList /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
            <Route path="/admin/user/:id" isAdmin={true} element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
            <Route path="/admin/reviews" isAdmin={true} element={<ProtectedRoute><RollReviews /></ProtectedRoute>} />
          </Routes>
          {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
        </div>

  );
}

export default App;
