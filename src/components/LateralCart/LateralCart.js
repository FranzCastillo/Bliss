import React from 'react'
import './LateralCart.scss'

const LateralCart = ({ cartItems }) => {
  return (
    <div className="lateral-cart-container">
      <h2 className="lateral-cart-title">Carrito de compras</h2>
      <div className="lateral-cart-items">
        {/* Renderizar los ítems del carrito aquí */}
        {/* Por ahora, solo mostraremos el nombre de los ítems */}
        {cartItems.map((item) => (
          <div key={item.id} className="lateral-cart-item">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LateralCart;