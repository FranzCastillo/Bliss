import { createContext, useState} from "react";
import { getProductData } from "../fetchProducts";

export const ShoppingCartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneProduct: () => {},
    removeOneProduct: () => {},
    clearCart: () => {},
    getTotal: () => {}
});

/**
 * Provides the context for the shopping cart to all the children wrapped in this element. It gives acces to other pages to
 * modify the cart.
 * @param children
 */
export default function ShoppingCartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    /**
     * Returns the quantity of a product in the cart
     * @param id the id of the product
     * @returns {number|*|number} the quantity of the product in the cart. If id is not in the cart, returns 0.
     */
    function getProductQuantity(id) {
        const quantity = cartProducts.find((product) => product.id === id)?.quantity;
        if(quantity === undefined){
            return 0;
        }
        return quantity;
    }

    /**
     * Adds a product to the cart. If the product is already in the cart, it increases the quantity by 1.
     * @param id the id of the product
     */
    function addOneProduct(id) {
        const quantity = getProductQuantity(id);
        if(quantity === 0){
            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    quantity: 1
                }
            ]);
        }else{
            setCartProducts(
                cartProducts.map((product) => {
                    if(product.id === id){
                        return {
                            ...product,
                            quantity: product.quantity + 1
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
        if(quantity === 1){
            removeProduct(id);
        }else{
            setCartProducts(
                cartProducts.map((product) => {
                    if(product.id === id){
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
    function getTotal(){
        let total = 0;
        cartProducts.forEach((product) => {
            total += getProductData(product.id).price * product.quantity;
        });
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
        getTotal
    }

    return(
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}