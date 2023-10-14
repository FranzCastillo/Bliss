import {supabase} from "../../../supabase/client.js";

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

const getProductPrice = async (id) => {
    const {data, error} = await supabase
        .from('precio_del_producto')
        .select('precio')
        .eq('producto_id', id)
        .single();

    return {data, error};
}

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