import React from 'react'
import {useNavigate} from 'react-router-dom'
import Link from '@mui/material/Link';

function NotFound() {
    const navigate = useNavigate()
    return (
        <div>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link onClick={() => navigate('/')} sx={{cursor: 'pointer'}} variant="body2">
                Go home
            </Link>
        </div>
    )
}

export default NotFound