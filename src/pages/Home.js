import React from 'react'
import {useEffect, useState} from 'react'
import fetchTable from '../components/fetchAPI.js'
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
    <div>Home</div>
  )
}

export default Home