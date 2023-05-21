import React from 'react';
import {Card, CardMedia, CardContent, Typography, Button, Modal, Box} from "@mui/material";
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = ({product}) => {

    const cart = React.useContext(ShoppingCartContext);
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Card sx={{maxWidth: 800, width: '70%', maxHeight:800}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.imageUrl}
                    alt={product.name}
                    onClick={handleModalOpen}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" align='left'>
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="div" align='left'>
                        {product.detail}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align='right'>
                        {product.code}
                    </Typography>
                    <Typography variant="h6" color="text.primary" align='right'>
                        ${product.price}
                    </Typography>
                    <br/>
                    <Button variant="contained" color="success" onClick={() => {cart.addOneProduct(product.id)}}>Agregar al carrito<AddShoppingCartIcon/></Button>
                    
                </CardContent>
            </Card>

            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{maxWidth: 800, width: '70%', maxHeight:1000, mx: 'auto', my: 4, p: 2, bgcolor: 'background.paper'}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.imageUrl}
                    alt={product.name}
                    onClick={handleModalOpen}
                />
                    <Typography variant="h5" id="modal-title" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" id="modal-description" gutterBottom>
                        {product.detail}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Código: {product.code}
                    </Typography>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Precio: ${product.price}
                    </Typography>
                    <Button variant="contained" onClick={handleModalClose}>Cerrar</Button>
                </Box>
            </Modal>
        </>
    );
};
export default ProductCard;
