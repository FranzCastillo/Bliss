/**
 * @module PDFGenerator
 * @category Orders
 * @subcategory PDF
 * @param {Object} props
 * @param {number} props.id - The id of the order to generate the PDF.
 * @returns {Promise<void>}
 * Creates a PDF file with the details of the order.
 */

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import {getOrderDetails, getOrderProducts} from "../Queries/OrderQueries.js";

/**
 * @param id - The id of the order to generate the PDF.
 * @returns {Promise<void>} - Fulfilled when  a PDF file is created successfully with the details of the order. The file is downloaded automatically
 */
const createFile = async ({id}) => {
    const {data, error} = await getOrderDetails(id);
    const {data: productsData, error: productsError} = await getOrderProducts(id);
    const doc = new jsPDF('p', 'pt', 'a4');
    const margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    const headers = [['Código', 'Nombre', 'Categoría', 'Cantidad', 'Precio Unitario']];
    const rows = productsData.map(product => {
        return [
            product.producto.codigo,
            product.producto.nombre,
            product.producto.categorias.categoria,
            product.cantidad,
            'Q.' + product.producto.precio.precio
        ];
    });
    const total = productsData.reduce((acc, product) => {
        return acc + (product.cantidad * product.producto.precio.precio);
    }, 0);
    rows.push([{content: 'Total', colSpan: 4, styles: {halign: 'left', fontStyle: 'bold'}}, 'Q.' + total]);

    autoTable(doc, {
        head: headers,
        body: rows,
        startY: 120,
        margin: margins,
        tableWidth: 'auto',
        columnWidth: 'auto',
        styles: {
            fontSize: 10,
            cellPadding: 5,
            overflow: 'linebreak',
            halign: 'left',
            valign: 'middle',
            columnWidth: 'auto',
            tableWidth: 'auto',
        },
        headerStyles: {
            fillColor: '#201b40',
            textColor: '#ffffff',
            fontStyle: 'bold',
        },
        bodyStyles: {
            fillColor: '#f3f3f3',
        },
        alternateRowStyles: {
            fillColor: '#ffffff',
        },
        didDrawPage: function (pageData) {
            // Header
            doc.setFontSize(20);
            doc.text(40, 40, 'Detalles de la Orden');
            doc.setFontSize(10);
            doc.text('# de Orden: ' + id, 40, 60);
            doc.text('Nombre del cliente: ' + data.usuarios.nombre + " " + data.usuarios.apellido, 40, 50)
            doc.text('Fecha de colocación: ' + data.fecha, 40, 70);
            doc.text('Estado: ' + data.estado, 40, 80,);
            doc.text('Dirección: ' + data.direccion, 40, 90);
            doc.text('Tipo de Pago: ' + data.tipos_de_pago.tipo, 40, 100);
            // Footer
            doc.setFontSize(10);
            doc.text(
                'Página ' + pageData.pageCount,
                pageData.settings.margin.left,
                doc.internal.pageSize.height - 30
            );
        }
    });
    doc.save(`DetallesOrden#${id}.pdf`);
}

export default createFile;