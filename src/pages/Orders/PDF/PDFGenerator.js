import jsPDF from "jspdf";

const createFile = ({id}) => {
    var doc = new jsPDF();

    // Define content for the PDF
    doc.text(`Hello World! ${id}`, 10, 10);

    // Save or display the PDF
    doc.save('sample.pdf');
}

export default createFile;