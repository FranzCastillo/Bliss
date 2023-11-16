import React from 'react'
import './SaveCartButton.scss'
import {Button} from '@mui/material'
import {ShoppingCartContext} from '../../contexts/ShoppingCartContext'
import {supabase} from '../../supabase/client'

//Button to save the cart in the database
export default function SaveCartButton() {
    //Get the cart from the context
    const cart = React.useContext(ShoppingCartContext);

    //Function to save the cart in the database
    const saveCart = async () => {
        const userData = await supabase.auth.getUser();
        let userId = null
        if (userData) {
            const {data, error} = await supabase
                .from("usuarios")
                .select("id")
                .eq("email", userData.data.user.email);
            if (data) {
                userId = data[0].id
                const cartItems = cart.items.map(item => ({
                    producto_id: item.id,
                    cantidad: cart.getProductQuantity(item.id),
                    usuario_id: userId,
                    talla: item.size
                }))
                const {error} = await supabase
                    .from("productos_en_carrito")
                    .delete()
                    .eq("usuario_id", userId)

                if (error) {
                    console.log(error)
                } else {
                    const {error} = await supabase
                        .from("productos_en_carrito")
                        .upsert(cartItems)
                    if (error) {
                        console.log(error)
                    } else {
                        alert("Carrito guardado exitosamente")
                    }
                }
            }
            if (error) {
                console.log(error);
            }
        }
    }
    return (
        //Button interface
        <div className='save-cart-button'>
            <div className='button'>
                <Button style={{marginLeft: "25px"}} onClick={saveCart}>
                    Guardar Carrito
                </Button>
            </div>
        </div>
    )
}