"use client";

import { ChangeEventHandler, useState } from "react";
import { read, writeFile, WorkBook, utils } from "xlsx";

export default function Page() {
  const [tableData, setTableData] = useState<WorkBook>();
  // example excels upload
  const handleExcelFile: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = read(data);

      setTableData(workbook);
    };
    reader.readAsArrayBuffer(file);
  };
  // example updated excel files download
  const handleUploadExcelDownload = () => {
    writeFile(tableData, "exampleUpdatedExcels.xlsx");
  };

  // example excels download
  const exampleData = [
    ["1", "2", "3", "4", "5"],
    ["a", "b", "c", "d", "e"],
  ];
  const newWorkbook: WorkBook = utils.book_new();
  utils.book_append_sheet(
    newWorkbook,
    utils.aoa_to_sheet(exampleData),
    "someSheetData"
  );
  const handleExcelDwonload = () => {
    writeFile(newWorkbook, "test.xlsx");
  };
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input type="file" onChange={handleExcelFile}></input>
      <button onClick={handleUploadExcelDownload}>
        download test uploaded excel
      </button>
      <button onClick={handleExcelDwonload}>download test excel</button>
    </section>
  );
}
