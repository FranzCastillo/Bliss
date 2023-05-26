import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
    const location = useLocation();
    const product = location.state?.product;

    if (!product) {
        return <div>No se encontró información del producto</div>;
    }

    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.detail}</p>
            <p>Código: {product.code}</p>
            <p>Precio: Q{product.price}</p>
            {/* Mostrar el resto de la información del producto */}
        </div>
    );
};

export default ProductDetails;