import {useEffect, useState} from 'react';
import {supabase} from './supabase/client.js';

export async function FetchProducts() {
    const { data: productData } = await supabase.rpc('getproducts')
    const products = productData.map((dato) => ({
        id: dato.id,
        name: dato.nombre,
        detail: dato.descripcion,
        code: dato.codigo,
        price: dato.precio,
        imageUrl: dato.imagen,
    }))

    return products

}

export function getProductData(id){
    let productData = FetchProducts().find(product => product.id === id)
    if(productData === undefined){
        alert("No se encontró el producto")
    }
    return productData;
}