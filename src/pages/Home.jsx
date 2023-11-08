import React from 'react'
import '../styles/home.scss';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Typography from '@mui/material/Typography';
import Carrusel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom';

import p1 from '../media/Photo1.jpg';
import p2 from '../media/Photo2.png';
import p3 from '../media/Photo3.png';
import p4 from '../media/Photo4.png';
import front from '../media/Front.png';

function Home({products}) {

    const navigate = useNavigate();

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, {state: {product}});
    };

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    
    // Obtén una copia de la lista original y mézclala aleatoriamente
    const shuffledProducts = shuffleArray(products).slice(0, 8);

      const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 550 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 550, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    return (
        <div className="container">
            <br/> <br/>
            <Carousel  responsive={responsive}  infiniteLoop={true} className='photo-carrousel' id="slider">
                <div>
                    <img src={p1} alt="Foto 1"/>
                </div>
                <div>
                    <img src={p2} alt="Foto 2"/>
                </div>
                <div>
                    <img src={p4} alt="Foto 3"/>
                </div>
            </Carousel>

            <div className="content">
                <h2
                    style={{
                        marginLeft: "30px",
                        marginBottom: "10px",
                        marginTop: "40px",
                        textAlign: "left",
                        color: "#201b40",
                    }}
                >
                    Te podría gustar
                </h2>

                <Carrusel responsive={responsive} className='products-carrousel'>
                    {shuffledProducts 
                    .map((product) => (
                        <>
                            <div 
                                style={{
                                    display: 'flex', 
                                    alignItems: 'center',
                                    justifyContent: 'center', 
                                    backgroundColor: 'white',
                                    height: '70%', 
                                    }}>
                                <Card className='img-card'
                                    sx={{
                                        boxShadow: 'none', 
                                        width: '80%', 
                                        height: '80%', 
                                        cursor: 'pointer',
                                        backgroundColor: '#E8E3E1',
                                        alignItems: 'center',
                                        }}>
                                    <CardMedia
                                        component="img"
                                        className='product-img'
                                        sx={{objectFit: 'contain', height: '75%',}}
                                        image={import.meta.env.VITE_STORAGE_URL + product.imageUrl + ".png"}
                                        alt={product.name}
                                        onClick={() => handleProductClick(product)}
                                        id={product.id}
                                    />
                                </Card>
                            </div>
                        </>
                    ))}
                </Carrusel>
            </div>

            <div className='widgets'>
                <div className='catalogue'>
                    <a href='https://issuu.com/feresq/docs/catologo_2' style={{textDecoration: 'none'}}>
                        <img src={front} alt="Portada"/>
                        <Typography variant="h6" style={{color: 'white'}}>
                            Ver catálogo
                        </Typography>
                    </a>
                </div>

                <div className='map'>
                    <Typography variant="h5" fontWeight="bold" className='animated-text'>
                            ¿Cómo llegar?
                    </Typography>
                    <br/>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.243990283568!2d-90.54599919098213!3d14.585168177398794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a140f3bb9a39%3A0xea8d5ae5bc8792cc!2s23%20Avenida%203410%2C%20Cdad.%20de%20Guatemala!5e0!3m2!1ses!2sgt!4v1684815547009!5m2!1ses!2sgt"
                        width="450"
                        height="450"
                        style={{border: '0'}}
                        allowfullscreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className='mapita'>
                    </iframe>
                </div>
            </div>
                <br/> <br/>

            
        </div>
    )
}

Home.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            categoryId: PropTypes.number.isRequired,
        })
    ).isRequired,
};


export default Home