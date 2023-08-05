import React from 'react';
import {Box, Button, Modal, Stack, Typography} from '@mui/material';
import {ShoppingCartContext} from '../../contexts/ShoppingCartContext';
import CartProductCard from "./CartProductCard/CartProductCard";
import {useNavigate} from "react-router-dom";

function CartModal({open, handleClose}) {
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
    const cart = React.useContext(ShoppingCartContext);
    const hasItems = cart.items.length > 0;
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/orders', { replace: true });
        handleClose();
    };


    return (
        <Modal keepMounted open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
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
                <Button onClick={handleClose} style={{paddingLeft: "25px"}}>Cerrar Carrito</Button>
            </Box>
        </Modal>
    );
}

export default CartModal;