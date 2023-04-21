import React from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';
import {ShoppingCartContext} from '../contexts/ShoppingCartContext';
import {getProductData} from "../fetchProducts";

function CartModal({open, handleClose}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const cart = React.useContext(ShoppingCartContext);

    return (
        <Modal keepMounted open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Productos en el carrito:
                </Typography>
                {cart.items.length > 0 ? (
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {cart.items.map((item) => {
                            let productData = getProductData(item.id);
                            return (
                                <div>
                                    <p>{item.quantity} x {productData.name} a Q.{productData.price}</p>
                                    <p></p>
                                </div>
                            );
                        })}
                    </Typography>
                ) : (
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        No hay productos en el carrito.
                    </Typography>
                )}
                <Button onClick={handleClose}>Cerrar Carrito</Button>
            </Box>
        </Modal>
    );
}

export default CartModal;
