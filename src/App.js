import './App.css';
import React, { useEffect, useState } from 'react';
import { supabase } from './supabase/client.js';
import { FetchProducts } from "./fetchProducts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await FetchProducts();
      setFetchedProducts(fetchedData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          setIsLoged(true);
        } else if (event === 'SIGNED_OUT') {
          setIsLoged(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoged) {
    return (
      <div className="App">
        <ShoppingCartProvider>
          <Router>
            <NavBarUser />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grid" element={<ProductsGrid products={fetchedProducts} />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/orders" element={<PlaceOrder />} />
              <Route path="/order-placed" element={<OrderPlaced />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/signup" element={<Signup/>}/>
            </Routes>
          </Router>
        </ShoppingCartProvider>
      </div>
    );
  } else {
    return (
      <div className="App">
        <ShoppingCartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </ShoppingCartProvider>
      </div>
    );
  }
}

export default App;