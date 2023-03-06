import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

//FOR PDF
import * as html2pdf from 'html2pdf.js';
import $ from 'jquery';

//FOR EXCEL
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
// import { title } from 'process';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {
  hidePDFDiv: boolean = false;
  display: any = 'none';
  pdfConverted: any = false;
  show: any = true;
  legendArray: any = ['ehe','e2','e3'];

  datasetDict: any = new Array;


  showData: boolean = false;
  contentLoaded: boolean = false;

  selectModel: boolean = true;
  showAnalysis: boolean = false;
  showAnimation: boolean = false;

  selectedModel: any = '';
  modelEntry(event: any){
    this.selectedModel = event.target.value;
    console.log("selected model: ", this.selectedModel);

    this.service.getCompanyTitles(this.selectedModel).subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.companyArray.push(data[i].orgName);
      }
      console.log('company array: ', this.companyArray);
    });
  }

  loadAnalysis(){
    this.showAnalysis = true;
  }





  dimensionTitleArray: any = [
    'Facility Intelligence',
    'Strategy & Governance',
    'Inter- & Intra-Company Collaboration',
    'Leadership Competency',
    'Workforce Learning & Development',
    'Enterprise Intelligence',
    'Shop Floor Intelligence',
    'Facility Connectivity',
    'Enterprise Connectivityn',
    'Shop Floor Connectivityn',
    'Facility Automation',
    'ProductLifeCycle',
    'Enterprise Automation',
    'Shop Floor Automation',
    'HorizontalIntegration',
    'VerticalIntegration',
  ];

  dimensionWeightArray: any = [
    0.037, 0.08325, 0.08325, 0.08325, 0.08325, 0.037, 0.037, 0.037, 0.037,
    0.037, 0.037, 0.111, 0.037, 0.037, 0.111, 0.111,
  ];

  // headingArray: any = ['Dimensions', 'Weight','Cutoff', 'C1', 'C2', 'C3', 'C4'];
  headingArray: any = ['Dimensions', 'Weight', 'Cutoff'];
  impDataTitle: any = ['', 'Headcount Ratio', 'Intensity', 'Adjusted Headcount Ratio'];
  impData: any = [];

  chartArray1: any = [];
  chartArray2: any = [];
  chartArray3: any = [];

  //DUMMY DATA FOR EXCEL

  emptyArray = [];

  downloadExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Data');

    let header = ['', 'Weight', 'C1', 'C2', 'C3', 'C4'];
    let headerRow = worksheet.addRow(header);

    for (let i = 0; i < this.dimensionTitleArray.length; i++) {
      let temp: any = [];
      temp.push(this.dimensionTitleArray[i]);
      temp.push(this.dimensionWeightArray[i]);
      console.log('temp: ', temp);
      let trial = worksheet.addRow(temp);
      trial.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4167B8' },
          bgColor: { argb: '' },
        };
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFF' },
          size: 12,
        };
      });
    }

    let fileName = 'ExcelReport';

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      fs.saveAs(blob, fileName + '-' + new Date().valueOf() + '.xlsx');
    });
  }

  downloadExcelNew() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Data');

    //FOR SHEET TITLE
    worksheet.mergeCells('A1', 'F4');
    let titleRow = worksheet.getCell('A1');
    titleRow.value = 'SMI Analysis';
    titleRow.font = {
      name: 'Calibri',
      size: 20,
      underline: 'single',
      bold: true,
      color: { argb: '0085A3' },
    };
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' };

    //FOR DATE
    worksheet.mergeCells('G1:H4');
    let d = new Date();
    let date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('G1');
    dateCell.value = date;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true,
    };
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' };


    worksheet.addRow(this.emptyArray)
    let impData = worksheet.addRow(this.impDataTitle)
    impData.eachCell((cell, number) => {
      cell.font = {
        bold: true,
        color: { argb: '000000' },
        size: 12,
      };
    });
    impData.alignment = { vertical: 'bottom', horizontal: 'center' };


    this.impData.push("")
    this.impData.push(this.headcountRatio)
    this.impData.push(this.intensity)
    this.impData.push(this.adjustedHeadcountRatio)
    worksheet.addRow(this.impData)

    //FOR HEADER ROW
    worksheet.addRow(this.emptyArray);
    let headerRow = worksheet.addRow(this.headingArray);
    headerRow.eachCell((cell, number) => {
      cell.font = {
        bold: true,
        color: { argb: '000000' },
        size: 12,
      };
    });
    headerRow.alignment = { vertical: 'bottom', horizontal: 'center' };

    //FOR DIMENSION LIST
    // for (let i = 0; i < this.dimensionTitleArray.length; i++) {
    //   let temp: any = [];
    //   temp.push(this.dimensionTitleArray[i]);
    //   temp.push(this.dimensionWeightArray[i]);
    //   let dimensionCells = worksheet.addRow(temp);
    // }

    for (let i = 0; i < this.dimensionArray.length; i++) {
      let temp: any = [];
      temp.push(this.dimensionArray[i]);
      temp.push(this.weightArray[i]);
      temp.push(this.cutoffArray[i]);
      for(let j=0; j<this.transposeArray[i].length; j++ ){
        temp.push(this.transposeArray[i][j]);
      }
      let dimensionCells = worksheet.addRow(temp);
    }

    worksheet.getCell('A1').border = {
      top: { style: 'thick' },
      left: { style: 'thick' },
      bottom: { style: 'thick' },
    };
    worksheet.getCell('G1').border = {
      top: { style: 'thick' },
      bottom: { style: 'thick' },
      right: { style: 'thick' },
    };

    this.adjustColumnWidth(worksheet);



    let fileName = 'ExcelReport';

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      fs.saveAs(blob, fileName + '-' + new Date().valueOf() + '.xlsx');
    });

    //end of method
  }

  private adjustColumnWidth(worksheet) {
    worksheet.columns.forEach((column) => {
      const lengths = column.values.map((v) => v.toString().length);
      const maxLength = Math.max(
        ...lengths.filter((v) => typeof v === 'number')
      );
      column.width = maxLength;
    });
  }

  downloadPDF() {
    console.log('ehhe');
    var element = document.getElementById('page');
    var opt = {
      margin: 0,
      filename: 'SMIAnalyis.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // New Promise-based usage:
    html2pdf()
      .from(element)
      .set(opt)
      .then(() => {
        const doc = $('#page');
        doc.find('.remove-on-export').remove();
        doc.find('.hide-on-export').hide(); // or or add / remove classes
        doc.find('.show-on-export').show(); // or add / remove classes
      })
      .save();

    this.pdfConverted = true;
  }

  tempArray: any = [];
  tempArray2: any = [];
  tempArray3: any = [];
  tempArray4: any = [];
  tempArray5: any = [];

  companyArray: any = [];
  responsesArray: any = new Array();
  transposeArray: any = new Array();
  dimensionArray: any = [];
  weightArray: any = [];
  cutoffArray: any = [];
  responseNewArray: any = [];
  deprivationMatrix: any = [];
  weightedDeprivationMatrix: any = [];
  censoredWeightedDeprivationMatrix: any = [];
  censoredDeprivationMatrix: any = [];

  CjArray: any = [];
  totalCutoff: any = 0.333;
  headcountNumerator: any = 0;
  headcountRatio: any = 0;
  intensityNumerator: any = 0;
  intensity: any = 0;
  adjustedHeadcountRatio: any = 0;

  uhrArray: any = [];
  chrArray: any = [];
  dimContr: any = [];

  sumArr: any = [];

  getData() {

    this.showAnimation = true;
    this.selectModel = false;
    //UNCOMMENT THESE
    // this.showAnalysis = true;
    // this.selectModel = false;

    for(let i=0; i<this.companyArray.length; i++){
      this.headingArray.push(this.companyArray[i]);
    }

    this.service.getAnalysisData(this.selectedModel).subscribe((data: any) => {
      console.log(data);
      let tempArr: any = [];
      let tempArr2: any = [];
      let tempArr3: any = [];
      let tempArr4: any = [];
      let tpArray: any = [];

      for (let i = 0; i < data.length; i++) {
        tempArr[i] = data[i].value;
        tempArr2[i] = data[i].value;
        tempArr3[i] = data[i].value;
        tempArr4[i] = data[i].value;
        tpArray[i] = data[i].value;
      }

      // console.log("tp array: ", tpArray)

      while (tempArr.length) {
        this.tempArray.push(tempArr.splice(0, 16));
        this.tempArray2.push(tempArr2.splice(0, 16));
        this.tempArray3.push(tempArr3.splice(0, 16));
        this.tempArray4.push(tpArray.splice(0, 16));
        this.tempArray5.push(tempArr4.splice(0, 16));
      }

      let trial: any = this.tempArray4;
      this.responsesArray = this.tempArray;
      this.deprivationMatrix = this.tempArray5;
      this.weightedDeprivationMatrix = this.tempArray2;
      this.censoredWeightedDeprivationMatrix = this.tempArray3;

      this.transposeArray = Array.from({ length: trial[0].length }, function(x, row) {
        return Array.from({ length: trial.length }, function(x, col) {
          return trial[col][row];
        });
      });

      console.log("transpose array: ", this.transposeArray);

      console.log('responses array:', this.responsesArray);
      console.log('deprivation matrix:', this.deprivationMatrix);
      console.log('weighted deprivation matrix:', this.weightedDeprivationMatrix);
      console.log('censored deprivation matrix:',this.censoredWeightedDeprivationMatrix);

      console.log('************************************************************');

      this.service.getDimensionData(this.selectedModel).subscribe((data: any) => {
        // console.log(data);

        for (let i = data.length - 1, ind = 0; i >= 0; i--, ind++) {
          this.dimensionArray[i] = data[ind].name;
          this.weightArray[i] = data[ind].weight;
          this.cutoffArray[i] = data[ind].cutoff;
        }

        console.log('dimension array: ', this.dimensionArray);
        console.log('weight array: ', this.weightArray);
        console.log('cutoff array: ', this.cutoffArray);

        // console.log('responses array: ', this.responsesArray)
        // console.log('dimension array: ', this.dimensionArray);
        // console.log('weight array: ', this.weightArray);
        // console.log('cutoff array: ', this.cutoffArray);

        for (let i = 0; i < this.responsesArray.length; i++) {
          let sum = 0;
          for (let j = 0; j < this.responsesArray[i].length; j++) {
            if (this.responsesArray[i][j] < this.cutoffArray[j]) {
              // this.weightedDeprivationMatrix[i][j] = 1;
              this.deprivationMatrix[i][j] = 1;
              this.weightedDeprivationMatrix[i][j] = this.weightArray[j];
              // this.censoredWeightedDeprivationMatrix[i][j]=1
              this.censoredWeightedDeprivationMatrix[i][j] = this.weightArray[j];
            } else {
              this.deprivationMatrix[i][j] = 0;
              this.weightedDeprivationMatrix[i][j] = 0;
              this.censoredWeightedDeprivationMatrix[i][j]=0;
            }
            sum += this.weightedDeprivationMatrix[i][j];
          }

          this.CjArray.push(sum);
          // console.log('response array subset: ', this.responsesArray[i]);
        }

        for(let i=0; i<this.weightedDeprivationMatrix.length; i++){
          let sum: any = 0;
          for(let j=0; j<this.weightedDeprivationMatrix[i].length; j++){
            sum+=this.weightedDeprivationMatrix[i][j];
          }


          this.sumArr.push((Math.round((sum/this.companyArray.length)* 100) / 10) *100);
        }

        console.log("sum arr: "+this.sumArr);

        console.log('Cj array: ', this.CjArray);
        console.log(
          '*****************************************************************'
        );

        for(let i=0; i<this.responsesArray.length; i++){
          if(this.CjArray[i]<this.totalCutoff){
            for(let j=0; j<this.responsesArray[0].length; j++){
              this.censoredWeightedDeprivationMatrix[i][j]=0;
              this.CjArray[i] = 0;
            }
          } else{
            this.headcountNumerator++;
          }
        }

        for(let i=0; i<this.CjArray.length; i++){
          // this.intensityNumerator += this.CjArray[i]/(this.dimensionArray.length);
          this.intensityNumerator += this.CjArray[i];
        }

        this.headcountRatio = (this.headcountNumerator/this.companyArray.length)*100;
        this.intensity = (this.intensityNumerator/this.headcountNumerator)*100;
        this.adjustedHeadcountRatio = (this.headcountRatio*this.intensity)/10000;

        console.log("headcount ratio: ", this.headcountRatio);
        console.log("intensity:", this.intensity);
        console.log("adjusted headcount ratio:", this.adjustedHeadcountRatio);

        let trialuhr: any = this.deprivationMatrix;

        trialuhr = Array.from({ length: trialuhr[0].length }, function(x, row) {
          return Array.from({ length: trialuhr.length }, function(x, col) {
            return trialuhr[col][row];
          });
        });


        for(let i=0; i<trialuhr.length; i++){
          let sum: any = 0;
          for(let j=0; j<trialuhr[i].length; j++){
            sum += trialuhr[i][j];
          }
          // console.log("sum: ", sum)

          this.uhrArray.push(Math.round((sum/this.companyArray.length)* 10) / 10);
        }
        console.log("uhr matrix: ", this.uhrArray);



        let trialchr: any = this.censoredWeightedDeprivationMatrix;

        trialchr = Array.from({ length: trialchr[0].length }, function(x, row) {
          return Array.from({ length: trialchr.length }, function(x, col) {
            return trialchr[col][row];
          });
        });

        console.log("censored depri. : ", this.censoredWeightedDeprivationMatrix);

        for(let i=0; i<trialchr.length; i++){
          let sum: any = 0;
          for(let j=0; j<trialchr[0].length; j++){
            // sum += trialchr[i][j];
            if(trialchr[i][j]>0){
              sum += 1;
            }
          }
          this.chrArray.push(Math.round((sum/this.companyArray.length )* 10) / 10);
        }

        console.log("chr array: ", this.chrArray);

        //DIMENSION-WISE CONTRIBUTION

        for(let i=0; i<this.dimensionArray.length; i++){
          let val = ((this.weightArray[i]/this.dimensionArray.length)*this.sumArr[i])/this.adjustedHeadcountRatio;

          // console.log("calc 1: ", (this.weightArray[i]/this.dimensionArray.length)*this.chrArray[i]);


          this.dimContr.push(Math.round((val )* 10) / 10);
        }

        console.log("dimensional contribution array: ", this.dimContr)

        this.chartArray1 = this.uhrArray;
    this.chartArray3 = this.chrArray;
    this.chartArray2 = this.dimContr;
    console.log("chart1: ",this.chartArray1)
    console.log("chart3: ",this.chartArray3)
    console.log("chart2: ",this.chartArray2)
    console.log("legend array: ", this.legendArray)

    var myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [
          'VerticalIntegration',
          'HorizontalIntegration',
          'ProductLifeCycle',
          'Shop Floor Automation',
          'Enterprise Automation',
          'Facility Automation',
          'Shop Floor Connectivity',
          'Enterprise Connectivity',
          'Facility Connectivity',
          'Shop Floor Intelligence',
          'Facility Intelligence',
          'Enterprise Intelligence',
          'Workforce Learning & Development',
          'Leadership Competency',
          'Inter- & Intra-Company Collaboration',
          'Strategy & Governance',
        ],
        datasets: [
          {
            label: '2022',
            data: this.chartArray1,
            backgroundColor: [
              'rgba(245, 39, 89, 0.2)',
              'rgba(245, 39, 60, 0.3)',
              'rgba(244, 20, 30, 0.3)',

              'rgba(75, 245, 0, 0.2)',
              'rgba(0, 245, 22, 0.2)',
              'rgba(0, 245, 66, 0.3)',
              'rgba(0, 245, 103, 0.3)',
              'rgba(0, 245, 124, 0.4)',
              'rgba(0, 245, 144, 0.4)',
              'rgba(0, 245, 150, 0.5)',
              'rgba(0, 245, 170, 0.5)',
              'rgba(0, 245, 184, 0.6)',

              'rgba(0, 168, 255, 0.2)',
              'rgba(0, 136, 255, 0.3)',
              'rgba(0, 105, 255, 0.35)',
              'rgba(0, 70, 255, 0.39)',
            ],
            borderColor: [
              'rgba(245, 39, 89, 1)',
              'rgba(245, 39, 60, 1)',
              'rgba(244, 20, 30, 1)',

              'rgba(75, 245, 0, 1)',
              'rgba(0, 245, 82, 1)',
              'rgba(0, 245, 126, 1)',
              'rgba(0, 245, 163, 1)',
              'rgba(0, 245, 184, 1)',
              'rgba(0, 245, 204, 1)',
              'rgba(0, 245, 200, 1)',
              'rgba(0, 245, 200, 1)',
              'rgba(0, 245, 204, 1)',

              'rgba(0, 168, 255, 1)',
              'rgba(0, 136, 255, 1)',
              'rgba(0, 105, 255, 1)',
              'rgba(0, 70, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            labels:{
              font: {
                weight: '100'
              }
            }
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
              font: {
                  size: 8,
              }
          }
          }
        },
      },
    });

    var myChart3 = new Chart('myChart3', {
      type: 'bar',
      data: {
        labels: [
          'VerticalIntegration',
          'HorizontalIntegration',
          'ProductLifeCycle',
          'Shop Floor Automation',
          'Enterprise Automation',
          'Facility Automation',
          'Shop Floor Connectivity',
          'Enterprise Connectivity',
          'Facility Connectivity',
          'Shop Floor Intelligence',
          'Facility Intelligence',
          'Enterprise Intelligence',
          'Workforce Learning & Development',
          'Leadership Competency',
          'Inter- & Intra-Company Collaboration',
          'Strategy & Governance',
        ],
        datasets: [
          {
            label: '# of Votes',
            data: this.chartArray3,
            backgroundColor: [
              'rgba(245, 39, 89, 0.2)',
              'rgba(245, 39, 60, 0.3)',
              'rgba(244, 20, 30, 0.3)',

              'rgba(75, 245, 0, 0.2)',
              'rgba(0, 245, 22, 0.2)',
              'rgba(0, 245, 66, 0.3)',
              'rgba(0, 245, 103, 0.3)',
              'rgba(0, 245, 124, 0.4)',
              'rgba(0, 245, 144, 0.4)',
              'rgba(0, 245, 150, 0.5)',
              'rgba(0, 245, 170, 0.5)',
              'rgba(0, 245, 184, 0.6)',

              'rgba(0, 168, 255, 0.2)',
              'rgba(0, 136, 255, 0.3)',
              'rgba(0, 105, 255, 0.35)',
              'rgba(0, 70, 255, 0.39)',
            ],
            borderColor: [
              'rgba(245, 39, 89, 1)',
              'rgba(245, 39, 60, 1)',
              'rgba(244, 20, 30, 1)',

              'rgba(75, 245, 0, 1)',
              'rgba(0, 245, 82, 1)',
              'rgba(0, 245, 126, 1)',
              'rgba(0, 245, 163, 1)',
              'rgba(0, 245, 184, 1)',
              'rgba(0, 245, 204, 1)',
              'rgba(0, 245, 200, 1)',
              'rgba(0, 245, 200, 1)',
              'rgba(0, 245, 204, 1)',

              'rgba(0, 168, 255, 1)',
              'rgba(0, 136, 255, 1)',
              'rgba(0, 105, 255, 1)',
              'rgba(0, 70, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            labels:{
              font: {
                weight: '100'
              }
            }
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    var myChart2 = new Chart('myChart2', {
      type: 'bar',
      data: {
        labels: [
          'VerticalIntegration',
          'HorizontalIntegration',
          'ProductLifeCycle',
          'Shop Floor Automation',
          'Enterprise Automation',
          'Facility Automation',
          'Shop Floor Connectivity',
          'Enterprise Connectivity',
          'Facility Connectivity',
          'Shop Floor Intelligence',
          'Facility Intelligence',
          'Enterprise Intelligence',
          'Workforce Learning & Development',
          'Leadership Competency',
          'Inter- & Intra-Company Collaboration',
          'Strategy & Governance',
        ],
        datasets: [
          {
            label: '# of Votes',
            data: this.chartArray2,
            backgroundColor: [
              'rgba(245, 39, 89, 0.2)',
              'rgba(245, 39, 60, 0.3)',
              'rgba(244, 20, 30, 0.3)',

              'rgba(75, 245, 0, 0.2)',
              'rgba(0, 245, 22, 0.2)',
              'rgba(0, 245, 66, 0.3)',
              'rgba(0, 245, 103, 0.3)',
              'rgba(0, 245, 124, 0.4)',
              'rgba(0, 245, 144, 0.4)',
              'rgba(0, 245, 150, 0.5)',
              'rgba(0, 245, 170, 0.5)',
              'rgba(0, 245, 184, 0.6)',

              'rgba(0, 168, 255, 0.2)',
              'rgba(0, 136, 255, 0.3)',
              'rgba(0, 105, 255, 0.35)',
              'rgba(0, 70, 255, 0.39)',
            ],
            borderColor: [
              'rgba(245, 39, 89, 1)',
              'rgba(245, 39, 60, 1)',
              'rgba(244, 20, 30, 1)',

              'rgba(75, 245, 0, 1)',
              'rgba(0, 245, 82, 1)',
              'rgba(0, 245, 126, 1)',
              'rgba(0, 245, 163, 1)',
              'rgba(0, 245, 184, 1)',
              'rgba(0, 245, 204, 1)',
              'rgba(0, 245, 200, 1)',
              'rgba(0, 245, 200, 1)',
              'rgba(0, 245, 204, 1)',

              'rgba(0, 168, 255, 1)',
              'rgba(0, 136, 255, 1)',
              'rgba(0, 105, 255, 1)',
              'rgba(0, 70, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            labels:{
              font: {
                weight: '100'
              }
            }
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },



      // data: {
      //   labels: ['Contribution'],
      //   datasets: [
      //     {
      //       label: '# of Votes',
      //       data: this.sumArr[0],
      //       backgroundColor: ['rgb(41,171,135,0.7)'],
      //       borderColor: ['rgba(26, 90, 72, 0.815)'],
      //       borderWidth: 1,
      //     },
      //     {
      //       label: '# of Votes',
      //       data: [10.4],
      //       backgroundColor: ['rgba(41, 171, 134, 0.418)'],
      //       borderColor: ['rgba(26, 90, 72, 0.815)'],
      //       borderWidth: 1,
      //     },
      //     {
      //       label: '# of Votes',
      //       data: [15.1],
      //       backgroundColor: ['rgb(15,82,186, 0.7)'],
      //       borderColor: ['rgb(15,82,186, 0.815)'],
      //       borderWidth: 1,
      //     },
      //     {
      //       label: '# of Votes',
      //       data: [7.4],
      //       backgroundColor: ['rgb(15,82,186, 0.418)'],
      //       borderColor: ['rgb(15,82,186, 0.815)'],
      //       borderWidth: 1,
      //     },
      //     {
      //       label: '# of Votes',
      //       data: [7.4],
      //       backgroundColor: ['rgba(197, 46, 137, 0.87)'],
      //       borderColor: ['rgb(129, 13, 87, 0.815))'],
      //       borderWidth: 1,
      //     },
      //     {
      //       label: '# of Votes',
      //       data: [7.4],
      //       backgroundColor: ['rgb(129, 13, 87, 0.67)'],
      //       borderColor: ['rgb(129, 13, 87, 0.815))'],
      //       borderWidth: 1,
      //     },
      //     {
      //       label: '# of Votes',
      //       data: [7.4],
      //       backgroundColor: ['rgb(129, 13, 87, 0.62)'],
      //       borderColor: ['rgb(129, 13, 87, 0.815))'],
      //       borderWidth: 1,
      //     },
      //   ],
      // },
      // options: {
      //   indexAxis: 'y',
      //   plugins: {
      //     legend: {
      //       display: false,
      //     },
      //   },
      //   scales: {
      //     x: {
      //       stacked: true,
      //     },
      //     y: {
      //       stacked: true,
      //       // beginAtZero: true
      //     },
      //   },
      // },
    });




        //END OF INNER SERVICE

        //UNCOMMENT THESE
        // this.showAnalysis = true;
      });
      this.showAnimation = false;
      this.showAnalysis = true;

      // END OF SERVICE CALL
    });

    //END OF METHOD
  }

  testVar() {
    console.log('data array: ', this.responsesArray);
    console.log('dimension array: ', this.dimensionArray);
    console.log('weight array: ', this.weightArray);
    console.log('cutoff array: ', this.cutoffArray);
  }

  constructor(private service: DataTransferService) {
    // this.service.getCompanyTitles(this.selectedModel).subscribe((data: any) => {
    //   console.log(data);
    //   for (let i = 0; i < data.length; i++) {
    //     this.companyArray.push(data[i].orgName);
    //   }
    //   console.log('company array: ', this.companyArray);
    // });

    // for(let i=0; i<this.companyArray.length; i++){
    //   this.service.getAnalysisDataForCompany('SIRI', this.companyArray[i]).subscribe((data: any) => {
    //     console.log("comp name: ", this.companyArray[i]);
    //     console.log(data);
    //     console.log("************************8")
    //   })
    // }
  }

  ngOnInit(): void {
    Chart.register(ChartDataLabels);

    // const myChart = new Chart('myChart', {
    //   type: 'bar',
    //   data: {
    //     labels: [
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //     ],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: this.chartArray1,
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(255, 159, 64, 0.2)',
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
    //           'rgba(255, 159, 64, 1)',
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });

    // const myChart2 = new Chart('myChart2', {
    //   type: 'bar',
    //   data: {
    //     labels: ['Dim1'],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [29],
    //         backgroundColor: ['rgb(41,171,135,0.7)'],
    //         borderColor: ['rgba(26, 90, 72, 0.815)'],
    //         borderWidth: 1,
    //       },
    //       {
    //         label: '# of Votes',
    //         data: [10.4],
    //         backgroundColor: ['rgba(41, 171, 134, 0.418)'],
    //         borderColor: ['rgba(26, 90, 72, 0.815)'],
    //         borderWidth: 1,
    //       },
    //       {
    //         label: '# of Votes',
    //         data: [15.1],
    //         backgroundColor: ['rgb(15,82,186, 0.7)'],
    //         borderColor: ['rgb(15,82,186, 0.815)'],
    //         borderWidth: 1,
    //       },
    //       {
    //         label: '# of Votes',
    //         data: [7.4],
    //         backgroundColor: ['rgb(15,82,186, 0.418)'],
    //         borderColor: ['rgb(15,82,186, 0.815)'],
    //         borderWidth: 1,
    //       },
    //       {
    //         label: '# of Votes',
    //         data: [7.4],
    //         backgroundColor: ['rgba(197, 46, 137, 0.87)'],
    //         borderColor: ['rgb(129, 13, 87, 0.815))'],
    //         borderWidth: 1,
    //       },
    //       {
    //         label: '# of Votes',
    //         data: [7.4],
    //         backgroundColor: ['rgb(129, 13, 87, 0.67)'],
    //         borderColor: ['rgb(129, 13, 87, 0.815))'],
    //         borderWidth: 1,
    //       },
    //       {
    //         label: '# of Votes',
    //         data: [7.4],
    //         backgroundColor: ['rgb(129, 13, 87, 0.62)'],
    //         borderColor: ['rgb(129, 13, 87, 0.815))'],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     indexAxis: 'y',
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //     scales: {
    //       x: {
    //         stacked: true,
    //       },
    //       y: {
    //         stacked: true,
    //         // beginAtZero: true
    //       },
    //     },
    //   },
    // });

    // const myChart3 = new Chart('myChart3', {
    //   type: 'bar',
    //   data: {
    //     labels: [
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //       'Dim1',
    //     ],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: this.chartArray3,
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(255, 159, 64, 0.2)',
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
    //           'rgba(255, 159, 64, 1)',
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     plugins: {
    //       legend: {
    //         display: false,
    //       },
    //     },
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });
  }

  showDownloadList: boolean = false;

  showList() {
    if (this.showDownloadList == true) {
      this.showDownloadList = false;
    } else if (this.showDownloadList == false) {
      this.showDownloadList = true;
    }

    this.display = 'block';
  }
}
