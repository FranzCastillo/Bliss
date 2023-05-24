import React from "react";
import {Grid} from "@mui/material";
import ProductCard from "./ProductCard";
import PrimarySearchAppBar from "../components/PrimarySearchAppBar";

const ProductsGrid = ({products}) => {
    return (
        <Grid spacing={2}>
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between">

                <item xs={9} textAlign="left">
                    <h1 style={{
                        marginLeft: "26px",
                        marginBottom: "30px",
                        marginTop: "30px",
                        textAlign: "left",
                        color: "#201b40"
                    }}>Nuestros Productos</h1>
                </item>

                <Grid item xs={3} sx={{marginRight: "24px", width: "300px"}}>
                    <PrimarySearchAppBar/>
                </Grid>


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
                        <ProductCard product={product}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default ProductsGrid;