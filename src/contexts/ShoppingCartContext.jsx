import {createContext, useEffect, useState} from "react";
import {getProductData} from "../fetchProducts";

export const ShoppingCartContext = createContext({
    items: [],
    getProductQuantity: () => {
    },
    addOneProduct: () => {
    },
    removeOneProduct: () => {
    },
    clearCart: () => {
    },
    getTotal: () => {
    },
    addMultipleProducts: () => {
    }
});

/**
 * Provides the context for the shopping cart to all the children wrapped in this element. It gives acces to other pages to
 * modify the cart.
 * @param children
 */
export default function ShoppingCartProvider({children}) {
    const [cartProducts, setCartProducts] = useState(JSON.parse(window.localStorage.getItem('cart')) || []);

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cartProducts));
    }, [cartProducts]);

    /**
     * Returns the quantity of a product in the cart
     * @param id the id of the product
     * @returns {number|*|number} the quantity of the product in the cart. If id is not in the cart, returns 0.
     */
    function getProductQuantity(id) {
        const quantity = cartProducts.find((product) => product.id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }

    /**
     * Returns the total quantity of products in the cart.
     * @returns {number} the total quantity of products in the cart.
     */
    function getTotalQuantity() {
        let total = 0;
        cartProducts.forEach((product) => {
            total += product.quantity
        });
        return total;
    }

    /**
     * Adds a product to the cart. If the product is already in the cart, it increases the quantity by 1.
     * @param id the id of the product
     * @param size the size of the product
     */
    async function addOneProduct(id, size) {
        const quantity = getProductQuantity(id);
        const prod = await getProductData(id)
        if (quantity === 0) {
            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    quantity: 1,
                    price: prod.price,
                    size: size
                }
            ]);
        } else {
            setCartProducts(
                cartProducts.map((product) => {
                    if (product.id === id) {
                        return {
                            ...product,
                            quantity: product.quantity + 1,
                            price: product.price,
                            size: size
                        };
                    }
                    return product;
                })
            );
        }
    }

    /**
     * Adds a specific quantity of a product to the cart.
     * @param id the id of the product
     * @param size the size of the product
     * @param n the quantity of products
     */
    async function addMultipleProducts(id, size, n) {
        const quantity = getProductQuantity(id);
        const prod = await getProductData(id)
        if (quantity === 0) {
            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    quantity: n,
                    price: prod.price,
                    size: size
                }
            ]);
        } else {
            setCartProducts(
                cartProducts.map((product) => {
                    if (product.id === id) {
                        return {
                            ...product,
                            quantity: product.quantity + n,
                            price: product.price,
                            size: size
                        };
                    }
                    return product;
                })
            );
        }
    }

    /**
     * Removes a product from the cart. If the product is in the cart, it decreases the quantity by 1. If the quantity is 1, it removes the product.
     * @param id the id of the product
     */
    function removeOneProduct(id) {
        const quantity = getProductQuantity(id);
        if (quantity === 1) {
            removeProduct(id);
        } else {
            setCartProducts(
                cartProducts.map((product) => {
                    if (product.id === id) {
                        return {...product, quantity: product.quantity - 1};
                    }
                    return product;
                })
            );
        }
    }

    /**
     * Removes a product completely from the cart.
     * @param id the id of the product
     */
    function removeProduct(id) {
        setCartProducts(
            products => products.filter((product) => product.id !== id)
        )
    }

    /**
     * Removes all the products from the cart.
     */
    function clearCart() {
        setCartProducts([]);
    }

    /**
     * Returns the total price of the products in the cart.
     * @returns {number}
     */
    function getTotal() {
        let total = 0;
        cartProducts.forEach((product) => {
            total += product.price * product.quantity
        });
        // Format Total to 2 decimals
        total = Math.round(total * 100) / 100;
        return total;
    }

    /**
     * The context value to be provided to the children. It contains the products in the cart, the functions to modify the cart and the total price.
     * @type {{removeOneProduct: removeOneProduct, removeProduct: removeProduct, addProduct: addProduct, clearCart: clearCart, getTotal: (function(): *), items: *[], getProductQuantity: ((function(*): (number|*))|*)}}
     */
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneProduct,
        removeOneProduct,
        clearCart,
        getTotal,
        getTotalQuantity,
        addMultipleProducts
    }

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}