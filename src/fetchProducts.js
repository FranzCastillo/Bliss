import {useEffect, useState} from 'react';
import {supabase} from './supabase/client.js';

export async function FetchProducts() {
    const { data: productData } = await supabase.rpc('getproducts')
    const { data: productSizes } = await supabase
                                    .from("disponibilidad_de_producto")
                                    .select("producto_id, talla")

    const grupos = {}
    productSizes.forEach((dato) => {
        const { producto_id, talla } = dato;
        if (!grupos[producto_id]) {
            grupos[producto_id] = [producto_id];
        }
        grupos[producto_id].push(talla);
    })

    const tallas = Object.values(grupos)

    const products = productData.map((dato) => ({
        id: dato.id,
        name: dato.nombre,
        detail: dato.descripcion,
        code: dato.codigo,
        price: dato.precio,
        imageUrl: dato.imagen,
        sizes: tallas[dato.id-1]
    }))

    return products

}

export async function getProductData(id){
    const products = await FetchProducts();
    let productData = products.find((product) => product.id === id);
    if(productData === undefined){
        alert("No se encontró el producto")
    }
    return productData;
}