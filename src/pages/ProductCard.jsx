import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/productcard.scss';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {ShoppingCartContext} from "../contexts/ShoppingCartContext";

/**
 * @param {*} props
 * @returns ProductCard
 */
const ProductCard = ({product}) => {

    const imageURL = import.meta.env.VITE_STORAGE_URL + product.imageUrl + ".png"
    const cart = useContext(ShoppingCartContext);
    const navigate = useNavigate();

    // Función para navegar a la página de un producto
    const handleProductClick = () => {
        navigate(`/product/${product.id}`, {state: {product}});
    };

    return (
        <Card sx={{width: '250px', height: '100%'}}>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Card className='img-card' sx={{boxShadow: 'none', width: '200px'}}>
                    <CardMedia
                        component="img"
                        className='product-img'
                        sx={{objectFit: 'contain'}}
                        image={imageURL}
                        alt={product.name}
                        onClick={handleProductClick}
                        id={product.id}
                    />
                </Card>
            </div>
            <br/>
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
                    Q{product.price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
