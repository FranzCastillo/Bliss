/**
 * Module in charge of different queries to the supabase instance for data retrieval about the orders.
 */

import {supabase} from "../../../supabase/client.js";

/**
 * Retrieves all the stored information about the order
 * @param id - The id of the order to retrieve.
 * @returns {Promise} - Returns a promise with the data and error of the query.
 */
const getOrderDetails = async (id) => {
    const {data, error} = await supabase
        .from('pedidos')
        .select(`
                    id,
                    usuarios (
                        id,
                        nombre,
                        apellido,
                        email,
                        telefono
                    ),
                    fecha,
                    estado,
                    direccion,
                    tipos_de_pago (
                        id,
                        tipo
                    ),
                    vendedor_id
                `)
        .eq('id', id)
        .single();

    return {data, error};
}

/**
 * Retrieves the price of the product with the given id.
 * @param id - The id of the product to retrieve the price.
 * @returns {Promise<{}>} - Returns a promise with the data and error of the query.
 */
const getProductPrice = async (id) => {
    const {data, error} = await supabase
        .from('precio_del_producto')
        .select('precio')
        .eq('producto_id', id)
        .single();

    return {data, error};
}

/**
 * Retrieves all the products of the order with the given id.
 * @param id - The id of the order to retrieve the products.
 * @returns {Promise<>} - Returns a promise with the data and error of the query.
 */
const getOrderProducts = async (id) => {
    const {data, error} = await supabase
        .from('productos_del_pedido')
        .select(`
                cantidad,
                talla,
                producto (
                    id,
                    nombre,
                    codigo,
                    categorias (
                        categoria
                    )
                )
            `)
        .eq('pedido_id', id);

    if (error) {
        return {data: null, error};
    }

    for (const product of data) {
        const {data: price, error} = await getProductPrice(product.producto.id);

        if (!error) {
            product.producto.precio = price;
        } else {
            return {data: null, error};
        }
    }

    return {data, error};
}

export {getOrderDetails, getOrderProducts};