import React, {useEffect, useState} from 'react';
import {supabase} from '../../supabase/client.js';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";
import DetailsButton from './Components/DetailsButton.jsx';
import FileButton from './Components/FileButton.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';


function Orders() {
    const navigate = useNavigate();
    const columns = [
        {field: 'id', headerName: 'ID', width: 70, type: 'number'},
        {field: 'cliente', headerName: 'Cliente', width: 225},
        {field: 'fecha', headerName: 'Fecha', width: 200},
        {field: 'estado', headerName: 'Estado', width: 130},
        {
            field: 'detalles',
            headerName: 'Detalles',
            renderCell: (params) => <DetailsButton id={params.row.id}/>,
            width: 100,
            sortable: false,
            filterable: false,
        },
        {
            field: 'fileDownload',
            headerName: 'Descargar',
            renderCell: (params) => <FileButton id={params.row.id}/>,
            width: 100,
            sortable: false,
            filterable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label={"Eliminar"}
                    onClick={() => {
                        Swal.fire({
                            title: 'Estás apunto de eliminar una orden',
                            text: "No podrás revertir esta acción",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#201b40',
                            cancelButtonColor: '#d33',
                            cancelButtonText: "Cancelar",
                            confirmButtonText: 'Sí, eliminar'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire(
                                    '¡Eliminado!',
                                    'La orden ha sido eliminada.',
                                    'success'
                                )
                                deleteRow(params.row.id);
                            }
                        })
                    }}
                />
            ],
            width: 100,
        }
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
                    estado
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

    const deleteRow = async (id) => {
        try {
            const {data, error} = await supabase
                .from('pedidos')
                .delete()
                .match({id: id});

            if (error) {
                throw new Error('Error deleting row');
            }

            // Update rows state
            const newRows = rows.filter((row) => row.id !== id);
            setRows(newRows);
        } catch (error) {
            console.error(error);
            // Handle error here, if needed
        }
    }

    return (
        loading ? <CircularProgress/> :
            <div id={'orders'}>
                <h1>Todas las Ordenes</h1>
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

export default Orders;