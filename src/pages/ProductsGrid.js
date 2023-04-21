import React from "react";
import { Grid, Box} from "@mui/material";
import ProductCard from "./ProductCard";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";
import { SpaceBar } from "@mui/icons-material";

const ProductsGrid = ({ products }) => {
  return (
    <Grid spacing={2}>
        <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            textAlign="left">

            <item xs={8} textAlign="left" >  
                <h1 style={{ marginLeft: "50px", marginBottom:"30px", marginTop:"30px", textAlign:"left"}}>Nuestros Productos</h1>
            </item>

            <item xs={4}>  
                <PrimarySearchAppBar/>
            </item>

        </Grid>

    <Grid container spacing={1}>
      {products.map((product) => (
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
    </Grid>
  );
};

export default ProductsGrid;