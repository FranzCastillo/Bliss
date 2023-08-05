import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard.jsx";
import FloatingButton from "../components/FloatingButton/FloatingButton";
import LateralCart from "../components/LateralCart/LateralCart";
import { supabase } from "../supabase/client";
import PrimarySearchBar from "../components/PrimarySearchBar/PrimarySearchBar";

const ProductsGrid = ({ products }) => {
  // Estado para almacenar los ítems del carrito
  const [cartItems] = useState([]);

  const [securityLevel, setSecurityLevel] = useState();
  useEffect(() => {
    async function getUserMail() {
      const userData = await supabase.auth.getUser();
      if (userData) {
        const { data, error } = await supabase
          .from("usuarios")
          .select("rol_id")
          .eq("email", userData.data.user.email);
        if (data) {
          setSecurityLevel(data[0].rol_id);
        }
        if (error) {
          console.log(error);
        }
      }
    }

    getUserMail();
  }, []);

  const isAdmin = securityLevel === 4;

  // Función de búsqueda para filtrar productos
  const handleSearch = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
  };

  const [search, setSearch] = useState("");

  return (
    <>
        <div className="principal" style={{ height: "100px", display: "flex" }}>
            {isAdmin && <FloatingButton />}
            <div className="secondary" style={{ width: "100%", display: "flex" }}>
                <Grid container spacing={2}>
                    <Grid item xs={8} textAlign="left">
                        <h1
                            style={{
                            marginLeft: "26px",
                            marginBottom: "30px",
                            marginTop: "40px",
                            textAlign: "left",
                            color: "#201b40",
                            }}
                        >
                            Nuestros Productos
                        </h1>
                    </Grid>
                    <Grid item xs={3} marginTop= "40px">
                        <PrimarySearchBar search={search} handleSearch={handleSearch} />
                    </Grid>
                    
                    {products
                    .filter((product) =>
                        product.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((product) => (
                        <Grid
                        container
                        direction="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginBottom={5}
                        item
                        xs={12}
                        sm={3}
                        key={product.id}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                    
                </Grid>
            </div>
            <div className="third" style={{ width: "20%", display: "flex" }}>
                <LateralCart />
            </div>
        </div>
    </>
  );
};

export default ProductsGrid;
