import React from "react";
import { Grid, Box} from "@mui/material";
import ProductCard from "./ProductCard";

const ProductsGrid = ({ products }) => {
  return (
    <Box textAlign="left">
        <h1 style={{ marginLeft: "50px", marginBottom:"30px", marginTop:"30px" }}>Nuestros Productos</h1>
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
    </Box>
  );
};

export default ProductsGrid;