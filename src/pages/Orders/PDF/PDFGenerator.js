import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import {getOrderDetails} from "../Queries/OrderQueries.js";

const createFile = async ({id}) => {
    // const {data, error} = await getOrderDetails(id);
    const doc = new jsPDF('p', 'pt', 'a4');
    const margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    const headers = [['Código', 'Nombre', 'Categoría', 'Cantidad', 'Precio Unitario']];
    const rows = [
        [1, 'Product 1', 100, 2, 200],
        [2, 'Product 2', 200, 1, 200],
        [3, 'Product 3', 300, 1, 300],
        [4, 'Product 4', 400, 1, 400],
        [{content: 'Total', colSpan: 4, styles: {halign: 'left', fontStyle: 'bold'}}, 1100],
    ];
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
        didDrawPage: function (data) {
            // Header
            doc.setFontSize(20);
            doc.text(40, 40, 'Detalles de la Orden');
            doc.setFontSize(10);
            doc.text(40, 60, '# de Orden: ' + id);
            doc.text(40, 70, 'Fecha de colocación: ' + '2021-05-05');
            doc.text(40, 80, 'Estado: ' + 'Pendiente');
            doc.text(40, 90, 'Dirección: ' + 'Calle 123');
            doc.text(40, 100, 'Tipo de Pago: ' + 'Efectivo');
            // Footer
            doc.setFontSize(10);
            doc.text(
                'Página ' + data.pageCount,
                data.settings.margin.left,
                doc.internal.pageSize.height - 30
            );
        }
    });
    doc.save(`DetallesOrden#${id}.pdf`);
}

export default createFile;