import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';


type AOA = any[][];
@Component({
  selector: 'app-excel-preview',
  templateUrl: './excel-preview.component.html',
  styleUrls: ['./excel-preview.component.css']
})


export class ExcelPreviewComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
  }

  fileName: string = 'SheetJS.xlsx';
  data: any;
  headData: any

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, raw: false, range: 10}));
      console.log(this.data[1]);

      this.headData = this.data[0];
      this.data = this.data.slice(1); // remove first header record

      const ws2: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];
      this.readDataSheet(ws2, 10);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  private readDataSheet(ws: XLSX.WorkSheet, startRow: number) {
    /* save data */
    let datas = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1, raw: false, range: startRow}));
    console.log(datas[1]);
    let headDatas = datas[0];
    datas = datas.slice(1); // remove first header record

    for (let i = 0; i < this.data.length; i++) {
      this.data[i][this.headData.length] = datas.filter(x => x[12] == this.data[i][0])
    }
    console.log(this.data[1]);
  }


}
