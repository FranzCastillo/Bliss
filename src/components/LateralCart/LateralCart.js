import React from 'react';
import './LateralCart.scss';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import LateralCartCard from './LateralCartCard/LateralCartCard';

const LateralCart = () => {
  const cart = React.useContext(ShoppingCartContext);

  return (
    <div className="lateral-cart-container">
      <h2 className="lateral-cart-title">Carrito de compras</h2>
      <div className="lateral-cart-items">
        {cart.items.map((item) => (
          <LateralCartCard key={item.id} id={item.id} quantity={item.quantity} />
        ))}
      </div>
    </div>
  );
};

export default LateralCart;
