import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
function ReportPdf(clientes) {
    console.log(clientes)
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  const reportTitle = [
    {
      text: "Inventry Management System",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  // Department: item.Department,
  // For: item.ItemFor,
  const dados = clientes.map((cliente,i) => {
      const data=new Intl.DateTimeFormat("en-US", { dateStyle: "short", }).format(new Date(Date.parse(cliente.createdAt)));
    return [
      { text: i, fontSize: 9, margin: [0, 1, 0, 1] },
      { text: cliente.catagory.catagoryName, fontSize: 9, margin: [0, 1, 0, 1] },
      { text: cliente.Department, fontSize: 9, margin: [0, 1, 0, 1] },
      { text: cliente.ItemFor, fontSize: 9, margin: [0, 1, 0, 1] },
      { text: cliente.item.itemName, fontSize: 9, margin: [0, 1, 0, 1] },
      { text: cliente.quantity, fontSize: 9, margin: [0, 1, 0, 1] },
      { text: data, fontSize: 9, margin: [0, 1, 0, 1] },
    ];
  });
  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*","*","*","*"],
        body: [
          [
            { text: "ID", style: "tableHeader", fontSize: 10 },
            { text: "Department", style: "tableHeader", fontSize: 10 },
            { text: "For", style: "tableHeader", fontSize: 10 },
            { text: "Catagory", style: "tableHeader", fontSize: 10, margin: [0, 1, 0, 1] },
            { text: "Item", style: "tableHeader", fontSize: 10 },
            { text: "Quantity", style: "tableHeader", fontSize: 10 },
            { text: "Date", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines", // headerLineOnly
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitios = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };
  
pdfMake.createPdf(docDefinitios).download();

}

export default ReportPdf;

