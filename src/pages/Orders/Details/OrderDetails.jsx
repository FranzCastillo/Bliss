import React, { useEffect, useState } from 'react';
import { supabase } from '../../../supabase/client.js';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderDetails.scss';

function OrderDetails() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        async function fetchOrder() {
            const { data, error } = await supabase
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
            if (error) {
                console.log(error);
                return;
            }
            setOrder(data);
        }
        fetchOrder();
    }, [id]);

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from('productos_del_pedido')
                .select(`
                cantidad,
                producto (
                    id,
                    nombre,
                    codigo,
                    imagen,
                    categorias (
                        id,
                        categoria
                    )
                )
            `)
                .eq('pedido_id', id);
            if (error) {
                console.log(error);
                return;
            }
            setProducts(data);
            console.log(data);
        }
        fetchProducts();
    }, [id]);

    return (
        <div id="order-details">
            {order ? (
                <>
                    <h1>Detalles de la Orden #{id}</h1>
                    <h2>Cliente: {order.usuarios.nombre} {order.usuarios.apellido}</h2>
                    <h2>Fecha de Colocación: {order.fecha}</h2>
                    <h2>Estado: {order.estado}</h2>
                    <h3>Dirección: {order.direccion}</h3>
                    <h3>Tipo de Pago: {order.tipos_de_pago.tipo}</h3>
                    <h3>Productos:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Código</th>
                                <th>Categoría</th>
                                <th>Cantidad</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products ? (
                                products.map((product) => (
                                    <tr key={product.producto.id}>
                                        <td>{product.producto.nombre}</td>
                                        <td>{product.producto.codigo}</td>
                                        <td>{product.producto.categorias.categoria}</td>
                                        <td>{product.cantidad}</td>
                                        <td>
                                            <img
                                                className={"product-image"}
                                                src={import.meta.env.VITE_STORAGE_URL +  product.producto.imagen + ".png"}
                                                alt={product.producto.nombre}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">LOADING</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <div>LOADING</div>
            )}
        </div>
    );
}

export default OrderDetails;
