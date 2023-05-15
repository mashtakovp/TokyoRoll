import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState, useSelector } from 'react'
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
import axios from 'axios'
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


  return (
    <Router>
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
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            }
            <Route path="/password/update" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
