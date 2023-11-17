import {useContext, useEffect} from 'react';
import Container from "@mui/material/Container";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {ShoppingCartContext} from "../../contexts/ShoppingCartContext";

/**
 * Place order modal
 * @returns OrderPlaced
 */
const OrderPlaced = () => {
    const navigate = useNavigate();
    const cart = useContext(ShoppingCartContext);

    // Function to clear the cart
    useEffect(() => {
        cart.clearCart();
    }, []);

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#201B40'
        }}>
            <h1>¡Su orden fue colocada exitosamente!</h1>
            <CheckCircleOutlineIcon
                sx={{fontSize: 100, paddingBottom: '30px'}}
            />
            <Button
                onClick={() => navigate('/grid')}
                variant="contained"
            >
                Seguir Comprando
            </Button>
        </Container>
    );
}

export default OrderPlaced;
