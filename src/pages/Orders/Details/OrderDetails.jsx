/**
 * In charge of displaying the details of a specific order.
 */

import React, {useEffect, useState} from 'react';
import {supabase} from '../../../supabase/client.js';
import {useNavigate, useParams} from 'react-router-dom';
import './OrderDetails.scss';
import CircularProgress from '@mui/material/CircularProgress';
import {getOrderDetails} from "../Queries/OrderQueries.js";

/**
 * Displays the details of a specific order.
 * @returns {Element}
 * @constructor
 */
function OrderDetails() {
    const navigate = useNavigate();

    const {id} = useParams();

    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetches the order details from the database.
    useEffect(() => {
        async function fetchOrder() {
            const {data, error} = await getOrderDetails(id);
            if (error) {
                console.log(error);
                return;
            }
            setOrder(data);
        }

        fetchOrder();
    }, [id]);

    // Fetches the products of the order from the database.
    useEffect(() => {
        async function fetchProducts() {
            const {data, error} = await supabase
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

    // Sets the loading state to false when the order and products are fetched.
    useEffect(() => {
        if (order && products) {
            setLoading(false);
        }
    }, [order, products]);

    return (
        loading ? <CircularProgress/> :
            <div id="order-details">
                {order ? (
                    <>
                        <div className="title">
                            <h1>Detalles del pedido #{id}</h1>
                        </div>
                        <div className="buttons">
                            <button
                                className="back-button"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Volver
                            </button>
                        </div>
                        <hr/>
                        <div className="details">
                            <div id={"client"}>
                                <h4>Cliente</h4>
                                <h2>{order.usuarios.nombre} {order.usuarios.apellido}</h2>
                            </div>
                            <div id={"date"}>
                                <h4>Fecha de Colocación</h4>
                                <h2>{new Date(order.fecha).toLocaleDateString()}</h2>
                            </div>
                            <div id={"state"}>
                                <h4>Estado</h4>
                                <h2>{order.estado}</h2>
                            </div>
                            <div id={"address"}>
                                <h4>Dirección</h4>
                                <h2>{order.direccion}</h2>
                            </div>
                            <div id={"payment"}>
                                <h4>Tipo de Pago</h4>
                                <h2>{order.tipos_de_pago.tipo}</h2>
                            </div>
                        </div>
                        <table className="product-table">
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
                                                src={import.meta.env.VITE_STORAGE_URL + product.producto.imagen + ".png"}
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
