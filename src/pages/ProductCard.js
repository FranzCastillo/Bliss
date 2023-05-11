import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 800, width: '70%' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" align='left'>
          {product.name}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div" align='left'>
          {product.detail}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" align='right'>
          {product.code}
        </Typography>
        <Typography variant="h6" color="text.primary" align='right'>
          Q{product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;