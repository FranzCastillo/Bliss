import './App.css';
import React, {useEffect, useState} from 'react';
import {supabase} from './supabase/client.js';
import {FetchProducts} from "./fetchProducts";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import NavBarUser from "./components/NavBarUser";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import {ShoppingCartContext} from "./contexts/ShoppingCartContext";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProductsGrid from './pages/ProductsGrid';
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderPlaced from "./pages/OrderPlaced/OrderPlaced";
import ProductDetails from "./pages/ProductDetails";
import Orders from './pages/Orders/Orders';
import MyOrders from './pages/MyOrders';
import ConfigProducts from './pages/ConfigProducts';
import NotFound from './pages/404';
import OrderDetails from "./pages/Orders/Details/OrderDetails.jsx";


function App() {
    const cart = React.useContext(ShoppingCartContext);
    const navigate = useNavigate()
    const location = useLocation()
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [isLoged, setIsLoged] = useState()

    useEffect(() => {
        async function fetchData() {
            const fetchedData = await FetchProducts();
            setFetchedProducts(fetchedData);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                window.localStorage.removeItem('cart')
                window.localStorage.removeItem('user')
                navigate('/login')
                setIsLoged(false)
            } else {
                setIsLoged(true)
                //getCartData()
            }
        })
        return () => {
            authListener.subscription.unsubscribe()
        };
    }, [])

    const [securityLevel, setSecurityLevel] = useState()
    useEffect(() => {
        async function getUserMail() {
            if (isLoged) {
                const userData = await supabase.auth.getUser()
                if (userData) {
                    const {
                        data,
                        error
                    } = await supabase.from("usuarios").select("rol_id").eq("email", userData.data.user.email)
                    if (data) {
                        setSecurityLevel(data[0].rol_id)
                    }
                    if (error) {
                        console.log(error)
                    }
                }
            }
        }

        getUserMail()
    })

    const isSeller = securityLevel === 2
    const isManager = securityLevel === 3
    const isAdmin = securityLevel === 4

    return (
        <div className="App">
            {isLoged && (
                <NavBarUser/>
            )}
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/grid" element={<ProductsGrid products={fetchedProducts}/>}/>
                {isAdmin && (
                    <>
                        <Route path="/config-product" element={<ConfigProducts/>}/>
                        <Route path="/all-orders" element={<Orders/>}/>
                        <Route path="/my-orders" element={<MyOrders/>}/>
                        <Route path={`/detalles-orden/:id`} element={<OrderDetails/>}/>
                    </>
                )}
                {isManager && (
                    <>
                        <Route path="/all-orders" element={<Orders/>}/>
                        <Route path="/my-orders" element={<MyOrders/>}/>
                    </>
                )}
                {isSeller && (
                    <>
                        <Route path="/my-orders" element={<MyOrders/>}/>
                    </>
                )}
                <Route path="/perfil" element={<Profile/>}/>
                <Route path="/orders" element={<PlaceOrder/>}/>
                <Route path="/order-placed" element={<OrderPlaced/>}/>
                <Route path="/product/:id" element={<ProductDetails/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;