import './CartModal.scss';
import React from 'react';
import {Box, Button, Modal, Stack, Typography} from '@mui/material';
import {ShoppingCartContext} from '../../contexts/ShoppingCartContext';
import CartProductCard from "./CartProductCard/CartProductCard";
import {useNavigate} from "react-router-dom";
import SaveCartButton from "../SaveCart/SaveCartButton";

/**
 * Cart modal component
 * @param open
 * @param handleClose
 * @returns CartModal
*/
function CartModal({open, handleClose}) {
    // Styles of the cart modal
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        minWidth: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxHeight: '600px',
        overflowY: 'auto',
        padding: 0
    };

    // Styles of the title
    const titleStyle = {
        position: "sticky",
        top: "0",
        width: "calc(100% - 50px)",
        backgroundColor: "white",
        zIndex: "100",
        paddingLeft: "25px",
        paddingTop: "15px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    }
    const productCards = {
        padding: "25px"
    }

    // Get the cart from the context
    const cart = React.useContext(ShoppingCartContext);
    const hasItems = cart.items.length > 0;
    const navigate = useNavigate();

    // Handle the click of the button
    const handleButtonClick = () => {
        navigate('/orders', {replace: true});
        handleClose();
    };

    return (
        <Modal keepMounted open={open} onClose={handleClose}>
            <Box sx={modalStyle} className='container'>
                <div style={titleStyle}>
                    <div className={"text"}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6" component="h2"
                        >
                            Mi Carrito
                        </Typography>
                        <Typography>
                            Total: Q.{cart.getTotal()}
                        </Typography>
                    </div>
                    {hasItems ? (
                        <div className={"buttons"}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    handleButtonClick()
                                }}
                            >
                                Colocar Orden
                            </Button>
                        </div>
                    ) : null}
                </div>
                {hasItems ? (
                    <div className={"product-cards"} style={productCards}>
                        <Stack>
                            {cart.items.map((item) => {
                                return (
                                    <CartProductCard
                                        key={item.id}
                                        id={item.id}
                                        quantity={item.quantity}
                                        size={item.size}
                                        style="cart"
                                    />
                                );
                            })}
                        </Stack>
                    </div>
                ) : (
                    // Align itself to the center of the modal
                    <Typography id="modal-modal-description" sx={{mt: 2}}
                                style={{paddingLeft: "25px", display: "flex"}}>
                        No hay productos en el carrito.
                    </Typography>
                )}
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <SaveCartButton/>
                    <Button onClick={handleClose} style={{marginRight: "25px", color: "Red"}}>Cerrar Carrito</Button>
                </div>
            </Box>
        </Modal>
    );
}

export default CartModal;