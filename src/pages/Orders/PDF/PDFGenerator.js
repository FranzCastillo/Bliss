import jsPDF from "jspdf";

// Creates a HTML table for it to be used in the PDF
const createTable = ({headers, data}) => {
    let table = '<table style="border-collapse: collapse; width: 100%;">';
    table += '<thead>';
    table += '<tr>';
    headers.forEach(header => {
        table += `<th style="border: 1px solid #000;">${header}</th>`;
    });
    table += '</tr>';
    table += '</thead>';
    table += '<tbody>';
    data.forEach(row => {
        table += '<tr>';
        row.forEach(cell => {
            table += `<td style="border: 1px solid #000;">${cell}</td>`;
        });
        table += '</tr>';
    });
    table += '</tbody>';
    table += '</table>';
    return table;
}

const createFile = ({id}) => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    const headers = ['Código', 'Nombre', 'Categoría', 'Cantidad', 'Precio Unitario'];
    const data = [
        ['1', 'Producto 1', 'Categoría 1', '10', '$100'],
        ['2', 'Producto 2', 'Categoría 2', '20', '$200'],
        ['3', 'Producto 3', 'Categoría 3', '30', '$300'],
    ];
    const table = createTable({headers, data});
    doc.html(
        createTable({headers, data}),
        {
            callback: function (doc) {
                doc.save(`order-${id}.pdf`);
            },
            x: margins.left,
            y: margins.top,
            width: margins.width
        },
        margins
    );
}

export default createFile;