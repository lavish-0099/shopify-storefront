import React from 'react';
import { useCart } from '../context/CartContext'; // Corrected import path
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>
        <p>Your cart is currently empty.</p>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-grid">
        <div className="cart-items">
          {cart.lines.edges.map(edge => {
            const item = edge.node;
            const variant = item.merchandise;
            return (
              <div key={item.id} className="cart-item-row">
                <img src={variant.image.url} alt={variant.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{variant.title.split(' / ')[0]}</h3>
                  <p>{variant.title}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)} className="remove-button">
                    Remove
                  </button>
                </div>
                <p className="cart-item-price">{variant.price.amount} {variant.price.currencyCode}</p>
              </div>
            );
          })}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{cart.cost.subtotalAmount.amount} {cart.cost.subtotalAmount.currencyCode}</span>
          </div>
          <a href={cart.checkoutUrl} className="checkout-button">
            Proceed to Checkout
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
