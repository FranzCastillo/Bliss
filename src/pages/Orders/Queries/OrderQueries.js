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
                    )
                `)
        .eq('id', id)
        .single();

    return {data, error};
}

export {getOrderDetails};