import React from 'react';
import Container from "@mui/material/Container";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";

const OrderPlaced = () => {
    const naviate = useNavigate();

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h1>¡Su orden fue colocada exitosamente!</h1>
            <CheckCircleOutlineIcon
                sx={{fontSize: 100, paddingBottom: '30px'}}/>
            <Button
                onClick={() => naviate('/grid')}
                variant="contained">
                Seguir Comprando
            </Button>
        </Container>
    );
}

export default OrderPlaced;