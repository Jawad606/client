import Papa from 'papaparse';

export function JSONTOCSV(data,filesname){
  let filename =  filesname;
  let csv = Papa.unparse(data)
  if (csv == null) return;

  var blob = new Blob([csv]);
  if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveBlob(blob, filename);
  else
  {
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
      a.download = filename;
      document.body.appendChild(a);
      a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a);
  }

    // const filename="1.csv"
    // var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // if (navigator.msSaveBlob) { // IE 10+
    //     navigator.msSaveBlob(blob, filename);
    // } else {
    //     var link = document.createElement("a");
    //     if (link.download !== undefined) { // feature detection
    //         // Browsers that support HTML5 download attribute
    //         var url = URL.createObjectURL(blob);
    //         link.setAttribute("href", url);
    //         link.setAttribute("download", filename);
    //         link.style.visibility = 'hidden';
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     }
    // }
}