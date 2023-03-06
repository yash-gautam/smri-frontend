import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css'],
})
export class ExcelUploadComponent implements OnInit {
  data = new Array();
  isReadOnly: boolean = false;
  firstRow = new Array();
  excelDimensionArray = new Array();
  excelCompanyNameArray = new Array();
  excelCompanySectorArray = new Array();
  excelResponsesArray = new Array();
  excelCompRevenueArray = new Array();
  excelCompEmpCountArray = new Array();
  excelCompLocationArray = new Array();

  excelUpload(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log('Raw Excel Data: ', ws);
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('Data array is: ', this.data);

      //DIMENSION ARRAY STARTS:
      for (let i = 6; i < this.data.length; i++) {
        for (let j = 0; j < 1; j++) {
          this.excelDimensionArray.push(this.data[i][j]);
        }
      }
      console.log('excel dimenison array: ', this.excelDimensionArray);
      //DIMENSION ARRAY ENDS:

      //COMPANY ARRAY STARTS:
      let ind: any = 0;
      for (let i = 0; i < 1; i++) {
        for (let j = 1; j < this.data[i].length; j++) {
          this.excelCompanyNameArray.push(this.data[i][j]);
          this.excelCompEmpCountArray.push(this.data[i+1][j]);
          this.excelCompRevenueArray.push(this.data[i+2][j]);
          this.excelCompanySectorArray.push(this.data[i+3][j]);
          this.excelCompLocationArray.push(this.data[i+4][j]);
        }
      }
      console.log('excel company name: ', this.excelCompanyNameArray);
      console.log('excel company sector: ', this.excelCompanySectorArray);
      console.log('excel company emp count: ', this.excelCompEmpCountArray);
      console.log('excel company revenue: ', this.excelCompRevenueArray);
      console.log('excel company location: ', this.excelCompLocationArray);
      //COMPANY ARRAY ENDS:

      //RESPONSE ARRAY STARTS:
      for (let col = 1; col < this.data[0].length; col++) {
        let tempArr = new Array();
        for (let row = 6; row < this.data.length; row++) {
          tempArr.push(this.data[row][col]);
        }
        this.excelResponsesArray.push(tempArr);
      }

      console.log('responses array: ', this.excelResponsesArray);
      //RESPONSE ARRAY ENDS:
    };
    reader.readAsBinaryString(target.files[0]);

    //END OF METHOD
  }

  excelDict: any = {};
  postData() {
    //POSTING EXCEL DATA STARTS
    for (let i = 0; i < this.excelCompanyNameArray.length; i++) {
      let organisation:any={}
      organisation.name = this.excelCompanyNameArray[i]
      organisation['revenue'] = this.excelCompRevenueArray[i]
      organisation['employeeCount'] = this.excelCompEmpCountArray[i]
      organisation['sector'] = this.excelCompanySectorArray[i]
      this.service.postOrganizationDetails(organisation).subscribe((data: any) => {
          console.log(data);
          this.service.excelPostSurveyedModel(this.excelCompanyNameArray[i],'SIRI').subscribe((data: any) => {
            console.log(data);
            let cj: any = 0;
            let idx: any = 0;
            for(let j=0; j<this.excelResponsesArray[i].length; j++){
              cj += this.excelResponsesArray[i][j];

              this.excelDict["name"] = this.excelDimensionArray[j];
              this.excelDict["value"] = this.excelResponsesArray[i][j];
              this.excelDict["rank"] = idx++;
              console.log("excelDict: ", this.excelDict)

              this.service.postValue(this.excelCompanyNameArray[i],'SIRI',this.excelDict).subscribe((data:any)=>{
                console.log(data);
              })

            }
            console.log("cj: ",cj);
            console.log('**********************************')
          });
      });



      // let cj: any = 0;
      // let idx: any = 0;
      // for(let j=0; j<this.excelResponsesArray[i].length; j++){
      //   cj += this.excelResponsesArray[i][j];

      //   this.excelDict["name"] = this.excelDimensionArray[j];
      //   this.excelDict["value"] = this.excelResponsesArray[i][j];
      //   this.excelDict["rank"] = idx++;
      //   console.log("excelDict: ", this.excelDict)

      //   this.service.postValue(this.excelCompanyNameArray[i],'SIRI',this.excelDict).subscribe((data:any)=>{
      //     console.log(data);
      //   })
      // }


    }
    //POSTING EXCEL DATA ENDS
  }

  selectedModel: any = 'SIRI';
  constructor(private service: DataTransferService) {
    this.service.getCompanyTitles(this.selectedModel).subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        // this.companyArray.push(data[i].orgName);
      }
      // console.log('company array: ', this.companyArray);
    });
  }

  ngOnInit(): void {}
}
