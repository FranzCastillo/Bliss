import React from 'react'
import '../styles/home.scss';
import {useEffect, useState} from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Typography from '@mui/material/Typography';

import p1 from '../media/Photo1.jpg';
import p2 from '../media/Photo2.png';
import p3 from '../media/Photo3.png';
import front from '../media/Front.png';

/*
      -- Modelo para usar fetchTable --

    const [datos, setDatos] = useState(null)
    useEffect(() => {
      const fetch = async () =>{
        setDatos( await fetchTable('tipos_de_pago') ) 
      }
      fetch()
    }, [])
    |---------------------------------------------------|
      -- Una forma simple de imprimir los datos --
    {datos && (
        <div className='si'>
          {datos.map(dato =>(<p>{dato.tipo}</p>))}
        </div>
      )}
    |---------------------------------------------------|
  */

function Home() {
    return (
        <div>
          <br/> <br/>
          <Carousel infiniteLoop={true} className='photo-carrousel'>
            <div>
              <img src={p1} alt="Foto 1"/>
            </div>
            <div>
              <img src={p2} alt="Foto 2"/>
            </div>
            <div>
              <img src={p3} alt="Foto 3"/>
            </div>
          </Carousel>
          
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
                referrerpolicy="no-referrer-when-downgrade"
                className='mapita'>
              </iframe>
            </div>
          </div>
          <br/> <br/>
        </div>
    )
}

export default Home