import React from 'react'
import {Alert, Paper, Typography} from "@mui/material";

const ordersStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    margin: "1rem",
}

function PlaceOrder() {
    return (
        <div className={"orders"}>
            <Paper elevation={3} style={ordersStyle}>
                <Alert severity="success">Su orden ha sido colocada con éxito</Alert>
            </Paper>
        </div>
    )
}

export default PlaceOrder