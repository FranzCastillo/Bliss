import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client.js';
import { DataGrid } from '@mui/x-data-grid';

function Orders() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'cliente', headerName: 'Cliente', width: 225 },
        { field: 'fecha', headerName: 'Fecha', width: 200 },
        { field: 'estado', headerName: 'Estado', width: 130 },
    ];

    const [rows, setRows] = useState([]);

    const fetchRows = async () => {
        try {
            let { data, error } = await supabase
                .from('pedidos')
                .select(`
            id,
            usuarios ( email ),
            fecha,
            estado
        `)
                .order('id', { ascending: true });

            if (error) {
                throw new Error('Error fetching rows');
            }
            data = data.map((row) => ({
                id: row.id,
                cliente: row.usuarios.email,
                fecha: row.fecha,
                estado: row.estado,
            }));

            return data;
        } catch (error) {
            console.error(error);
            // Handle error here, if needed
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchRows();
            setRows(data);
        };

        fetchData();
    }, []);

    return (
        <div id={'orders'}>
            <h1>Todas las Ordenes</h1>
            <div style={{ height: 500, width: '90%', paddingLeft: '25px', paddingRight: '25px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    );
}

export default Orders;