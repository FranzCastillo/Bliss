import './App.css';
import React, { useEffect, useState } from 'react';
import { supabase } from './supabase/client.js';
import { FetchProducts } from "./fetchProducts";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import NavBarUser from "./components/NavBarUser";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ShoppingCartProvider from "./contexts/ShoppingCartContext";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProductsGrid from './pages/ProductsGrid';
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import OrderPlaced from "./pages/OrderPlaced/OrderPlaced";
import ProductDetails from "./pages/ProductDetails";
import Orders from './pages/Orders/Orders';
import MyOrders from './pages/Orders/MyOrders';
import ConfigProducts from './pages/ConfigProducts';
import NotFound from './pages/404';
import { ShoppingCartContext } from './contexts/ShoppingCartContext';
import OrderDetails from "./pages/Orders/Details/OrderDetails.jsx";
import LoadingPage from './pages/Loading.jsx';

/**
 * App
 * @returns App
*/
function App() {
  const cart = React.useContext(ShoppingCartContext);
  const navigate = useNavigate()
  const location = useLocation()
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [isLoged, setIsLoged] = useState()
  
  // Function to fetch the products
  useEffect(() => {
    async function fetchData() {
      const fetchedData = await FetchProducts();
      setFetchedProducts(fetchedData);
    }
    fetchData();
  }, []);

  // Function to check the user session
  useEffect(()=>{
    const{data:authListener}=supabase.auth.onAuthStateChange((event,session) =>{
      if(!session){
        window.localStorage.removeItem('cart')
        window.localStorage.removeItem('user')
        navigate('/login')
        setIsLoged(false)
      }else{
        setIsLoged(true)
        //getCartData()
      }
    })
    return () => {
      authListener.subscription.unsubscribe()
    };
  },[])

  // Function to get the security level of the user
  const [securityLevel, setSecurityLevel] = useState() 
    useEffect(()=>{
        async function getUserMail() {
          if(isLoged){
            const userData = await supabase.auth.getUser()
            if(userData){
                const {data,error} = await supabase.from("usuarios").select("rol_id").eq("email",userData.data.user.email)
                if(data){
                    setSecurityLevel(data[0].rol_id)
                }
                if(error){
                    console.log(error)
                } 
            }
          }
        }

        getUserMail()
    })

    // Security levels
    const isSeller = securityLevel === 2
    const isManager = securityLevel === 3
    const isAdmin = securityLevel === 4

  return (
      <div className="App">
          {isLoged&&(
            <>
              <NavBarUser/>
              {!securityLevel&&(
                <LoadingPage/>
              )}
            </>
          )}
          <Routes>
            <Route path='/' element={<Home products={fetchedProducts}/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/grid" element={<ProductsGrid/>}/>
            {isAdmin && (
                <>
                  <Route path="/config-product" element={<ConfigProducts products={fetchedProducts}/>}/>
                  <Route path="/all-orders" element={<Orders/>}/>
                  <Route path="/my-orders" element={<MyOrders/>}/>
                  <Route path={`/detalles-orden/:id`} element={<OrderDetails/>}/>
                </>
            )}
            {isManager && (
                <>
                  <Route path="/all-orders" element={<Orders/>}/>
                  <Route path="/my-orders" element={<MyOrders/>}/>
                  <Route path={`/detalles-orden/:id`} element={<OrderDetails/>}/>
                </>
            )}
            {isSeller && (
                <>
                  <Route path="/my-orders" element={<MyOrders/>}/>
                  <Route path={`/detalles-orden/:id`} element={<OrderDetails/>}/>
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