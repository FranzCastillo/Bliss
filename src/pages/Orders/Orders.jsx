import React, {useEffect, useState} from 'react';
import {supabase} from '../../supabase/client.js';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import DetailsButton from './Components/DetailsButton.jsx';
import FileButton from './Components/FileButton.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';


/**
 * Orders component. In charge of showing all the orders in the /all-orders path
 * @returns {Element} JSX
 * @constructor
 */
function Orders() {
    // Columns displayed by the Data Grid
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

    // Rows displayed by the Data Grid
    const [rows, setRows] = useState([]);

    // Fetch rows from the database
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
            // Maps the results of the query to the names of the columns
            data = data.map((row) => ({
                id: row.id,
                cliente: row.usuarios.email,
                fecha: new Date(row.fecha).toLocaleDateString(),
                estado: row.estado,
            }));

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // Fetch rows from the database on component mount
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchRows();
            setRows(data);
        };

        fetchData();
    }, []);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Set loading state to false when rows have not been fetched
    useEffect(() => {
        if (rows.length > 0) {
            setLoading(false);
        }
    }, [rows]);

    /**
     * Deletes a row from the database
     * @param id The if of the row to be deleted
     * @returns {Promise<void>} A promise that resolves when the row has been deleted
     */
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