import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart from local storage on initial render
        try {
            const localData = localStorage.getItem('cart');
            if (localData) {
                setCartItems(JSON.parse(localData));
            }
        } catch (error) {
            console.error("Could not parse cart from local storage", error);
        }
    }, []);

    useEffect(() => {
        // Save cart to local storage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // --- FIXED FUNCTION ---
    // This function now contains the logic to add items to the cart.
    const addToCart = (product, variantId, quantity) => {
        if (!variantId) {
            console.error("No variant selected");
            alert("Please select a product option before adding to cart.");
            return;
        }

        setCartItems(prevItems => {
            // Check if the variant is already in the cart
            const existingItem = prevItems.find(item => item.variantId === variantId);

            if (existingItem) {
                // If it exists, update the quantity
                return prevItems.map(item =>
                    item.variantId === variantId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // If it's a new item, find the variant details and add it
                const selectedVariant = product.variants.edges.find(edge => edge.node.id === variantId);

                if (!selectedVariant) {
                    console.error("Variant not found in product");
                    return prevItems;
                }

                const newItem = {
                    id: product.id, // Product ID for general reference
                    variantId: variantId, // Variant ID is the unique identifier for a cart item
                    title: product.title,
                    handle: product.handle,
                    image: selectedVariant.node.image.url,
                    price: parseFloat(selectedVariant.node.priceV2.amount),
                    quantity: quantity,
                };
                return [...prevItems, newItem];
            }
        });
    };

    const removeFromCart = (variantId) => {
        setCartItems(cartItems.filter(item => item.variantId !== variantId));
    };

    const updateQuantity = (variantId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(variantId);
        } else {
            setCartItems(cartItems.map(item =>
                item.variantId === variantId ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};