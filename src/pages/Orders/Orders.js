import React from 'react'
import {Paper, Typography} from "@mui/material";

const ordersStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    margin: "1rem",
}

function Orders() {
    return (
        <div className={"orders"}>
            <Paper elevation={3} style={ordersStyle}>
                <Typography>
                    HOLA
                </Typography>
            </Paper>
        </div>
    )
}

export default Orders