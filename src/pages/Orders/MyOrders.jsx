import React, {useEffect, useState} from 'react';
import {supabase} from '../../supabase/client.js';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import DetailsButton from '../Orders/Components/DetailsButton.jsx';
import CircularProgress from '@mui/material/CircularProgress';

function MyOrders() {
    const columns = [
        {field: 'id', headerName: 'ID', width: 70, type: 'number'},
        {field: 'cliente', headerName: 'Cliente', width: 225},
        {field: 'fecha', headerName: 'Fecha', width: 200},
        {field: 'estado', headerName: 'Estado', width: 130},
        {field: 'vendedor_id', headerName: 'Vendedor', width: 130},
        {
            field: 'detalles',
            headerName: 'Detalles',
            renderCell: (params) => <DetailsButton id={params.row.id}/>,
            width: 100,
            sortable: false,
            filterable: false,
        },
    ];

    const [rows, setRows] = useState([]);

    const fetchRows = async () => {
        try {
            let {data, error} = await supabase
                .from('pedidos')
                .select(`
                    id,
                    usuarios ( email ),
                    fecha,
                    estado, 
                    vendedor_id
                `)
                .order('id', {ascending: false});

            if (error) {
                throw new Error('Error fetching rows');
            }
            data = data.map((row) => ({
                id: row.id,
                cliente: row.usuarios.email,
                fecha: new Date(row.fecha).toLocaleDateString(),
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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (rows.length > 0) {
            setLoading(false);
        }
    }, [rows]);

    return (
        loading ? <CircularProgress/> :
            <div id={'orders'}>
                <br></br>
                <h1>Mis Ordenes</h1>
                <div style={{height: 500, width: '90%', paddingLeft: '25px', paddingRight: '25px'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        sx={{borderWidth: '1px', borderColor: 'divider'}}
                    />
                </div>
            </div>
    );
}

export default MyOrders;