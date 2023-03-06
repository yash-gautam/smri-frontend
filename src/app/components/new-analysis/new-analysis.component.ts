import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';

@Component({
  selector: 'app-new-analysis',
  templateUrl: './new-analysis.component.html',
  styleUrls: ['./new-analysis.component.css']
})
export class NewAnalysisComponent implements OnInit {

  // DATA FOR Average Score GRAPH  STARTS

  averageScoreArr: any = [0.06, 0.13, 0.15, 0.14, 0.09, 0.08, 0.014, 0.19, 0.17, 0.13, 0.15, 0.16, 0.13, 0.08, 0.08, 0.16];

  companyScoreArr: any = [0.03, 0.05, 0.07, 0.11, 0.14, 0.145, 0.11, 0.08, 0.11, 0.175, 0.16, 0.08, 0.075, 0.08, 0.12, 0.18];

  dimensionArray: any = ['VerticalIntegration','HorizontalIntegration','ProductLifeCycle','Shop Floor Automation', 'Enterprise Automation','Facility Automation','Shop Floor Connectivity','Enterprise Connectivity', 'Facility Connectivity', 'Shop Floor Intelligence', 'Facility Intelligence',  'Enterprise Intelligence', 'Workforce Learning & Development', 'Leadership Competency', 'Inter- & Intra-Company Collaboration', 'Strategy & Governance'];

 weightArray:any=   [0.111, 0.111, 0.111, 0.037, 0.037, 0.037, 0.037, 0.037, 0.037, 0.037, 0.037, 0.037, 0.08325, 0.08325, 0.08325, 0.08325]
cutoffArray:any = [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
  // DATA FOR Average Score GRAPH ENDS


  // DATA FOR UNCENSORED GRAPH STARTS

  uncensoredChartArr: any = [0.06, 0.13, 0.15, 0.14, 0.09, 0.08, 0.014, 0.19, 0.17, 0.13, 0.15, 0.16, 0.13, 0.08, 0.08, 0.16];

  // DATA FOR UNCENSORED GRAPH ENDS




   // DATA FOR CENSORED GRAPH STARTS

   censoredChartArr: any = [0.03, 0.05, 0.07, 0.11, 0.14, 0.145, 0.11, 0.08, 0.11, 0.175, 0.16, 0.08, 0.075, 0.08, 0.12, 0.18];

   // DATA FOR CENSORED GRAPH ENDS


  //  DATA FOR RANK TABLE STARTS

  topCompanyArray: any = ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Snapchat', 'Twitter', 'Reddit',
  'Spotify', 'Paypal', 'Discord'];
  topCompanyResultArray: any = [35, 29.2, 27.4, 24.8, 15.9, 13.4, 8, 5.3, 4.1, 3.2];

  //  DATA FOR RANK TABLE ENDS



  // DATA FOR Dimension Contribution GRAPH STARTS

  dimensionContributionArr: any = [40, 62, 54, 36, 27, 25, 48, 69, 40, 65, 34, 55, 24, 59, 46, 43];

  // DATA FOR Dimension Contribution GRAPH ENDS




  // DATA FOR Dimension Contribution GRAPH STARTS

    chartArray4_process: any = [5, 8, 9, 5, 4];
    chartArray4_tech: any = [2, 7, 8, 5, 3];
    chartArray4_org: any = [1, 3, 6, 5, 2];

    xaxis: any = [1, 2, 3, 4, 5];

    // DATA FOR Dimension Progression GRAPH ENDS

    tempArray: any = [];
    tempArray2: any = [];
    tempArray3: any = [];
    tempArray4: any = [];
    tempArray5: any = [];

    companyArray: any = [];
    responsesArray: any = new Array();
    transposeArray: any = new Array();

    // weightArray: any = [];
    // cutoffArray: any = [];
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
    averageArray: any = [];

    sumArr: any = [];




  dimensionWeightArray: any = [
    0.037, 0.08325, 0.08325, 0.08325, 0.08325, 0.037, 0.037, 0.037, 0.037,
    0.037, 0.037, 0.111, 0.037, 0.037, 0.111, 0.111,
  ];

  // headingArray: any = ['Dimensions', 'Weight','Cutoff', 'C1', 'C2', 'C3', 'C4'];
  headingArray: any = ['Dimensions', 'Weight', 'Cutoff'];
  impDataTitle: any = ['', 'Headcount Ratio', 'Intensity', 'Adjusted Headcount Ratio'];
  impData: any = [];








  constructor(private service:DataTransferService) { }

  ngOnInit(): void {

    console.log(this.service.organisationSurvyedValuesArray)

    this.service.getCompanyTitles("SIRI").subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.companyArray.push(data[i].orgName);
      }
      console.log('company array: ', this.companyArray);
    });



    for(let i=0; i<this.companyArray.length; i++){
      this.headingArray.push(this.companyArray[i]);
    }

    this.service.getAnalysisData("SIRI").subscribe((data: any) => {
      console.log("entire data: ", data);
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

      for(let i=0; i<this.transposeArray.length; i++){
        let sum = 0;
        for(let j=0; j<this.transposeArray[0].length; j++){
           sum+=this.transposeArray[i][j];
        }
        this.averageArray[i] = sum/this.transposeArray[0].length;
      }

      console.log('average array:', this.averageArray);
      console.log('responses array:', this.responsesArray);
      console.log('deprivation matrix:', this.deprivationMatrix);
      console.log('weighted deprivation matrix:', this.weightedDeprivationMatrix);
      console.log('censored deprivation matrix:',this.censoredWeightedDeprivationMatrix);

      console.log('************************************************************');



















      // CODE INSIDE GETDIMENSION DATA
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

        // this.sumArr.push(((sum/this.companyArray.length)));
        this.sumArr.push((Math.round(((sum/this.companyArray.length) + Number.EPSILON )* 100) /100));
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

        this.uhrArray.push(Math.round(((sum/this.companyArray.length *100 ) + Number.EPSILON) * 100) / 100);
        // this.uhrArray.push((sum/this.companyArray.length));
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
        this.chrArray.push(Math.round(((sum/this.companyArray.length *100 ) + Number.EPSILON) * 100) / 100);
      }

      console.log("chr array: ", this.chrArray);

      //DIMENSION-WISE CONTRIBUTION

      for(let i=0; i<this.dimensionArray.length; i++){
        let val = ((this.weightArray[i]/this.dimensionArray.length)*this.chrArray[i]/100)/this.adjustedHeadcountRatio;
        let numer = (this.weightArray[i]/this.dimensionArray.length) * this.chrArray[i]/100;
        let denom = this.adjustedHeadcountRatio;

        console.log("weight: "+this.weightArray[i]);
        console.log("chr: "+this.chrArray[i]/100);

        console.log("numer: "+numer);
        console.log("denom: "+denom);
        console.log("ans: "+numer/denom*100);

        console.log("************");

        // console.log("calc 1: ", (this.weightArray[i]/this.dimensionArray.length)*this.chrArray[i]);


        // this.dimContr.push((Math.round((val ) + Number.EPSILON) * 100) / 100);
        this.dimContr.push(val *100);
      }

      console.log("dimensional contribution array: ", this.dimContr)

  //     this.chartArray1 = this.uhrArray;
  // this.chartArray3 = this.chrArray;
  // this.chartArray2 = this.dimContr;
  // console.log("chart1: ",this.chartArray1)
  // console.log("chart3: ",this.chartArray3)
  // console.log("chart2: ",this.chartArray2)
  // console.log("legend array: ", this.legendArray)













  Chart.register(ChartDataLabels);

  const averageScoreChart = new Chart('averageScoreChart', {
    type: 'line',
    data: {
      labels: this.dimensionArray,
      datasets: [
        {
          label: 'Overall Companies Position',
          data: this.averageArray,
          backgroundColor: 'rgba(0, 0, 128, 0.4)',
          borderColor: 'rgb(0, 0, 128)',
          tension: 0.45,
          borderWidth:2.3,
          datalabels:{
            display: false
          },

          // fill: true,
          // backgroundColor:''
        },
        {
          label: 'Your Company’s Position',
          data: this.service.organisationSurvyedValuesArray,
          backgroundColor: 'rgba(80, 200, 120, 0.4)',
          borderColor: 'rgba(80, 200, 120)',
          tension: 0.4,
          borderWidth:2.3,
          datalabels:{
            display: false
          },

          // fill: true,
          // backgroundColor:''
        },
      ],

    },
    options: {
      plugins: {
        legend: {
          display: true,
        },
      },
      scales: {
        y: {
          ticks:{
            color: 'black',
            padding: 8,
            font:{
              size: 11
            }
          },
          beginAtZero: true,
          title:{
            display:true,
            text: 'Percentage',
            color: '#313892',
            font: {
              size: 20,
            },

          }
        },
        x: {
          ticks:{
            color: 'black',
            padding: 8,
            font:{
              size: 10
            }
          },
          beginAtZero: true,
          title:{
            display:true,
            text: 'Dimensions',
            color: '#313892',
            font: {
              size: 20,
            },

          }
        },
        // y: {
        //   beginAtZero: true,
        //   title:{
        //     display:true,
        //     text: 'Percentage of Company in each dimentions',
        //     // color:
        //   }
        // },
        // x: {
        //   title:{
        //     display:true,
        //     text: 'Dimensions'
        //   }
        // },
      },
    },
  });

  const uncensoredHeadcountChart = new Chart('uncensoredHeadcountChart', {
    type: 'line',
    data: {
      labels: this.dimensionArray,
      datasets: [
        {
          label: 'Overview',
          data: this.uhrArray,
          backgroundColor: 'rgba(227,38,54, 0.6)',
          borderColor: 'rgba(227,38,54)',
          tension: 0.45,
          borderWidth:2.3,
          datalabels:{
            display: false
          },

          // fill: true,
          // backgroundColor:''
        },
        {
          type: 'bar',
          label: 'Ind',
          data: this.uhrArray,
          backgroundColor: ['rgba(227,38,54, 0.6)', 'rgba(0,71,171, 0.6)'],
          borderColor: ['rgba(227,38,54)', 'rgba(0,71,171)'],
          borderWidth:2.3,
          datalabels:{
            display: false
          },
        }
      ],

    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks:{
            color: 'black',
            padding: 8,
            font:{
              size: 11
            }
          },
          beginAtZero: true,
          title:{
            display:true,
            text: 'Percentage',
            color: '#313892',
            font: {
              size: 20,
            },

          }
        },
        x: {
          ticks:{
            color: 'black',
            padding: 8,
            font:{
              size: 10
            }
          },
          beginAtZero: true,
          title:{
            display:true,
            text: 'Dimensions',
            color: '#313892',
            font: {
              size: 20,
            },

          }
        },
      },
    },
  });

  const censoredHeadcountChart = new Chart('censoredHeadcountChart', {
    type: 'line',
    data: {
      labels: this.dimensionArray,
      datasets: [
        {
          label: 'Overview',
          data: this.chrArray,
          backgroundColor: 'rgba(227,38,54, 0.6)',
          borderColor: 'rgba(227,38,54)',
          tension: 0.45,
          borderWidth:2.3,
          datalabels:{
            display: false
          },

          // fill: true,
          // backgroundColor:''
        },
        {
          type: 'bar',
          label: 'Ind',
          data: this.chrArray,
          backgroundColor: ['rgba(227,38,54, 0.6)', 'rgba(0,71,171, 0.6)'],
          borderColor: ['rgba(227,38,54)', 'rgba(0,71,171)'],
          borderWidth:2.3,
          datalabels:{
            display: false
          },
        }
      ],

    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks:{
            color: 'black',
            padding: 8,
            font:{
              size: 11
            }
          },
          beginAtZero: true,
          title:{
            display:true,
            text: 'Percentage',
            color: '#313892',
            font: {
              size: 20,
            },

          }
        },
        x: {
          ticks:{
            color: 'black',
            padding: 8,
            font:{
              size: 10
            }
          },
          beginAtZero: true,
          title:{
            display:true,
            text: 'Dimensions',
            color: '#313892',
            font: {
              size: 20,
            },

          }
        },
      },
    },
  });

  const dimensionContributionChart = new Chart('dimensionContributionChart', {
    type: 'bar',
    data: {
      labels: this.dimensionArray,
      datasets: [
        {
          label: 'Overview',
          data: this.dimensionContributionArr,
          backgroundColor: ['rgba(237	,75	,71)'],
          borderColor: ['rgba(237	,75	,71)'],
          borderWidth:2.3,
          datalabels:{
            display: false
          },
        },
      ],

    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks:{
            color: 'black',
            padding: 8,
            font:{
              size: 11
            }
          },
          title:{
            display:true,
            text: 'Dimension',
            color: '#313892',
            font: {
              size: 20,
            },
          }
        },
        x: {
          ticks:{
            color: 'black',
            padding: 8,
            font:{
              size: 10
            }
          },
          title:{
            display:true,
            text: 'Percentage Score',
            color: '#313892',
            font: {
              size: 20,
            },

          }
        },
      },
    },
  });



  const dimensionProgressionChart = new Chart('dimensionProgressionChart', {
    type: 'bar',
    data: {
      labels: this.xaxis,
      datasets: [
        {
          label: 'Process',
          data: this.chartArray4_process,
          backgroundColor: ['rgba(0,71,171, 0.6)'],
          borderColor: ['rgba(0,71,171)'],
          borderWidth:2.3,
          datalabels:{
            display: false
          },
        },
        {
          label: 'Technology',
          data: this.chartArray4_tech,
          backgroundColor: ['rgba(227,38,54, 0.6)'],
          borderColor: ['rgba(227,38,54)'],
          borderWidth:2.3,
          datalabels:{
            display: false
          },
        },
        {
          label: 'Organisation',
          data: this.chartArray4_org,
          backgroundColor: ['rgba(54, 54, 54, 0.6)'],
          borderColor: ['rgba(54, 54, 54)'],
          borderWidth:2.3,
          datalabels:{
            display: false
          },
        },
      ],

    },
    options: {
      plugins: {
        // legend: {
        //   display: false,
        // },
      },
      scales: {
        y: {
          title:{
            display:true,
            text: '#############'
          },
          beginAtZero: true,
        },
        X: {
          title:{
            display:true,
            text: '#############'
          },
        },
      },
    },
  });

      // CODE INSIDE GETDIMENSION DATA ENDS













  //     this.service.getDimensionData("SIRI").subscribe((data: any) => {
  //       // console.log(data);

  //       for (let i = data.length - 1, ind = 0; i >= 0; i--, ind++) {
  //         this.dimensionArray[i] = data[ind].name;
  //         this.weightArray[i] = data[ind].weight;
  //         this.cutoffArray[i] = data[ind].cutoff;
  //       }

  //       console.log('dimension array: ', this.dimensionArray);
  //       console.log('weight array: ', this.weightArray);
  //       console.log('cutoff array: ', this.cutoffArray);

  //       // console.log('responses array: ', this.responsesArray)
  //       // console.log('dimension array: ', this.dimensionArray);
  //       // console.log('weight array: ', this.weightArray);
  //       // console.log('cutoff array: ', this.cutoffArray);

  //       for (let i = 0; i < this.responsesArray.length; i++) {
  //         let sum = 0;
  //         for (let j = 0; j < this.responsesArray[i].length; j++) {
  //           if (this.responsesArray[i][j] < this.cutoffArray[j]) {
  //             // this.weightedDeprivationMatrix[i][j] = 1;
  //             this.deprivationMatrix[i][j] = 1;
  //             this.weightedDeprivationMatrix[i][j] = this.weightArray[j];
  //             // this.censoredWeightedDeprivationMatrix[i][j]=1
  //             this.censoredWeightedDeprivationMatrix[i][j] = this.weightArray[j];
  //           } else {
  //             this.deprivationMatrix[i][j] = 0;
  //             this.weightedDeprivationMatrix[i][j] = 0;
  //             this.censoredWeightedDeprivationMatrix[i][j]=0;
  //           }
  //           sum += this.weightedDeprivationMatrix[i][j];
  //         }

  //         this.CjArray.push(sum);
  //         // console.log('response array subset: ', this.responsesArray[i]);
  //       }

  //       for(let i=0; i<this.weightedDeprivationMatrix.length; i++){
  //         let sum: any = 0;
  //         for(let j=0; j<this.weightedDeprivationMatrix[i].length; j++){
  //           sum+=this.weightedDeprivationMatrix[i][j];
  //         }


  //         this.sumArr.push((Math.round((sum/this.companyArray.length)* 100) / 10) *100);
  //       }

  //       console.log("sum arr: "+this.sumArr);

  //       console.log('Cj array: ', this.CjArray);
  //       console.log(
  //         '*****************************************************************'
  //       );

  //       for(let i=0; i<this.responsesArray.length; i++){
  //         if(this.CjArray[i]<this.totalCutoff){
  //           for(let j=0; j<this.responsesArray[0].length; j++){
  //             this.censoredWeightedDeprivationMatrix[i][j]=0;
  //             this.CjArray[i] = 0;
  //           }
  //         } else{
  //           this.headcountNumerator++;
  //         }
  //       }

  //       for(let i=0; i<this.CjArray.length; i++){
  //         // this.intensityNumerator += this.CjArray[i]/(this.dimensionArray.length);
  //         this.intensityNumerator += this.CjArray[i];
  //       }

  //       this.headcountRatio = (this.headcountNumerator/this.companyArray.length)*100;
  //       this.intensity = (this.intensityNumerator/this.headcountNumerator)*100;
  //       this.adjustedHeadcountRatio = (this.headcountRatio*this.intensity)/10000;

  //       console.log("headcount ratio: ", this.headcountRatio);
  //       console.log("intensity:", this.intensity);
  //       console.log("adjusted headcount ratio:", this.adjustedHeadcountRatio);

  //       let trialuhr: any = this.deprivationMatrix;

  //       trialuhr = Array.from({ length: trialuhr[0].length }, function(x, row) {
  //         return Array.from({ length: trialuhr.length }, function(x, col) {
  //           return trialuhr[col][row];
  //         });
  //       });


  //       for(let i=0; i<trialuhr.length; i++){
  //         let sum: any = 0;
  //         for(let j=0; j<trialuhr[i].length; j++){
  //           sum += trialuhr[i][j];
  //         }
  //         // console.log("sum: ", sum)

  //         this.uhrArray.push(Math.round((sum/this.companyArray.length)* 10) / 10);
  //       }
  //       console.log("uhr matrix: ", this.uhrArray);



  //       let trialchr: any = this.censoredWeightedDeprivationMatrix;

  //       trialchr = Array.from({ length: trialchr[0].length }, function(x, row) {
  //         return Array.from({ length: trialchr.length }, function(x, col) {
  //           return trialchr[col][row];
  //         });
  //       });

  //       console.log("censored depri. : ", this.censoredWeightedDeprivationMatrix);

  //       for(let i=0; i<trialchr.length; i++){
  //         let sum: any = 0;
  //         for(let j=0; j<trialchr[0].length; j++){
  //           // sum += trialchr[i][j];
  //           if(trialchr[i][j]>0){
  //             sum += 1;
  //           }
  //         }
  //         this.chrArray.push(Math.round((sum/this.companyArray.length )* 10) / 10);
  //       }

  //       console.log("chr array: ", this.chrArray);

  //       //DIMENSION-WISE CONTRIBUTION

  //       for(let i=0; i<this.dimensionArray.length; i++){
  //         let val = ((this.weightArray[i]/this.dimensionArray.length)*this.sumArr[i])/this.adjustedHeadcountRatio;

  //         // console.log("calc 1: ", (this.weightArray[i]/this.dimensionArray.length)*this.chrArray[i]);


  //         this.dimContr.push(Math.round((val )* 10) / 10);
  //       }

  //       console.log("dimensional contribution array: ", this.dimContr)

  //   //     this.chartArray1 = this.uhrArray;
  //   // this.chartArray3 = this.chrArray;
  //   // this.chartArray2 = this.dimContr;
  //   // console.log("chart1: ",this.chartArray1)
  //   // console.log("chart3: ",this.chartArray3)
  //   // console.log("chart2: ",this.chartArray2)
  //   // console.log("legend array: ", this.legendArray)













  //   Chart.register(ChartDataLabels);

  //   const averageScoreChart = new Chart('averageScoreChart', {
  //     type: 'line',
  //     data: {
  //       labels: this.dimensionArray,
  //       datasets: [
  //         {
  //           label: 'Overall Companies Position',
  //           data: this.averageScoreArr,
  //           backgroundColor: 'rgba(0, 0, 128, 0.4)',
  //           borderColor: 'rgb(0, 0, 128)',
  //           tension: 0.45,
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },

  //           // fill: true,
  //           // backgroundColor:''
  //         },
  //         {
  //           label: 'Your Company’s Position',
  //           data: this.companyScoreArr,
  //           backgroundColor: 'rgba(80, 200, 120, 0.4)',
  //           borderColor: 'rgba(80, 200, 120)',
  //           tension: 0.4,
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },

  //           // fill: true,
  //           // backgroundColor:''
  //         },
  //       ],

  //     },
  //     options: {
  //       plugins: {
  //         legend: {
  //           display: true,
  //         },
  //       },
  //       scales: {
  //         y: {
  //           ticks:{
  //             color: 'black',
  //             padding: 8,
  //             font:{
  //               size: 11
  //             }
  //           },
  //           beginAtZero: true,
  //           title:{
  //             display:true,
  //             text: 'Percentage',
  //             color: '#313892',
  //             font: {
  //               size: 20,
  //             },

  //           }
  //         },
  //         x: {
  //           ticks:{
  //             color: 'black',
  //             padding: 8,
  //             font:{
  //               size: 10
  //             }
  //           },
  //           beginAtZero: true,
  //           title:{
  //             display:true,
  //             text: 'Dimensions',
  //             color: '#313892',
  //             font: {
  //               size: 20,
  //             },

  //           }
  //         },
  //         // y: {
  //         //   beginAtZero: true,
  //         //   title:{
  //         //     display:true,
  //         //     text: 'Percentage of Company in each dimentions',
  //         //     // color:
  //         //   }
  //         // },
  //         // x: {
  //         //   title:{
  //         //     display:true,
  //         //     text: 'Dimensions'
  //         //   }
  //         // },
  //       },
  //     },
  //   });

  //   const uncensoredHeadcountChart = new Chart('uncensoredHeadcountChart', {
  //     type: 'line',
  //     data: {
  //       labels: this.dimensionArray,
  //       datasets: [
  //         {
  //           label: 'Overview',
  //           data: this.uncensoredChartArr,
  //           backgroundColor: 'rgba(227,38,54, 0.6)',
  //           borderColor: 'rgba(227,38,54)',
  //           tension: 0.45,
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },

  //           // fill: true,
  //           // backgroundColor:''
  //         },
  //         {
  //           type: 'bar',
  //           label: 'Ind',
  //           data: this.uncensoredChartArr,
  //           backgroundColor: ['rgba(227,38,54, 0.6)', 'rgba(0,71,171, 0.6)'],
  //           borderColor: ['rgba(227,38,54)', 'rgba(0,71,171)'],
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },
  //         }
  //       ],

  //     },
  //     options: {
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },
  //       scales: {
  //         y: {
  //           ticks:{
  //             color: 'black',
  //             padding: 8,
  //             font:{
  //               size: 11
  //             }
  //           },
  //           beginAtZero: true,
  //           title:{
  //             display:true,
  //             text: 'Percentage',
  //             color: '#313892',
  //             font: {
  //               size: 20,
  //             },

  //           }
  //         },
  //         x: {
  //           ticks:{
  //             color: 'black',
  //             padding: 8,
  //             font:{
  //               size: 10
  //             }
  //           },
  //           beginAtZero: true,
  //           title:{
  //             display:true,
  //             text: 'Dimensions',
  //             color: '#313892',
  //             font: {
  //               size: 20,
  //             },

  //           }
  //         },
  //       },
  //     },
  //   });

  //   const censoredHeadcountChart = new Chart('censoredHeadcountChart', {
  //     type: 'line',
  //     data: {
  //       labels: this.dimensionArray,
  //       datasets: [
  //         {
  //           label: 'Overview',
  //           data: this.censoredChartArr,
  //           backgroundColor: 'rgba(227,38,54, 0.6)',
  //           borderColor: 'rgba(227,38,54)',
  //           tension: 0.45,
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },

  //           // fill: true,
  //           // backgroundColor:''
  //         },
  //         {
  //           type: 'bar',
  //           label: 'Ind',
  //           data: this.censoredChartArr,
  //           backgroundColor: ['rgba(227,38,54, 0.6)', 'rgba(0,71,171, 0.6)'],
  //           borderColor: ['rgba(227,38,54)', 'rgba(0,71,171)'],
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },
  //         }
  //       ],

  //     },
  //     options: {
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },
  //       scales: {
  //         y: {
  //           ticks:{
  //             color: 'black',
  //             padding: 8,
  //             font:{
  //               size: 11
  //             }
  //           },
  //           beginAtZero: true,
  //           title:{
  //             display:true,
  //             text: 'Percentage',
  //             color: '#313892',
  //             font: {
  //               size: 20,
  //             },

  //           }
  //         },
  //         x: {
  //           ticks:{
  //             color: 'black',
  //             padding: 8,
  //             font:{
  //               size: 10
  //             }
  //           },
  //           beginAtZero: true,
  //           title:{
  //             display:true,
  //             text: 'Dimensions',
  //             color: '#313892',
  //             font: {
  //               size: 20,
  //             },

  //           }
  //         },
  //       },
  //     },
  //   });

  //   const dimensionContributionChart = new Chart('dimensionContributionChart', {
  //     type: 'bar',
  //     data: {
  //       labels: this.dimensionArray,
  //       datasets: [
  //         {
  //           label: 'Overview',
  //           data: this.dimensionContributionArr,
  //           backgroundColor: ['rgba(237	,75	,71)'],
  //           borderColor: ['rgba(237	,75	,71)'],
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },
  //         },
  //       ],

  //     },
  //     options: {
  //       indexAxis: 'y',
  //       plugins: {
  //         legend: {
  //           display: false,
  //         },
  //       },
  //       scales: {
  //         y: {
  //           ticks:{
  //             color: 'black',
  //             padding: 8,
  //             font:{
  //               size: 11
  //             }
  //           },
  //           title:{
  //             display:true,
  //             text: 'Dimension',
  //             color: '#313892',
  //             font: {
  //               size: 20,
  //             },
  //           }
  //         },
  //         x: {
  //           ticks:{
  //             color: 'black',
  //             padding: 8,
  //             font:{
  //               size: 10
  //             }
  //           },
  //           title:{
  //             display:true,
  //             text: 'Percentage Score',
  //             color: '#313892',
  //             font: {
  //               size: 20,
  //             },

  //           }
  //         },
  //       },
  //     },
  //   });



  //   const dimensionProgressionChart = new Chart('dimensionProgressionChart', {
  //     type: 'bar',
  //     data: {
  //       labels: this.xaxis,
  //       datasets: [
  //         {
  //           label: 'Process',
  //           data: this.chartArray4_process,
  //           backgroundColor: ['rgba(0,71,171, 0.6)'],
  //           borderColor: ['rgba(0,71,171)'],
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },
  //         },
  //         {
  //           label: 'Technology',
  //           data: this.chartArray4_tech,
  //           backgroundColor: ['rgba(227,38,54, 0.6)'],
  //           borderColor: ['rgba(227,38,54)'],
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },
  //         },
  //         {
  //           label: 'Organisation',
  //           data: this.chartArray4_org,
  //           backgroundColor: ['rgba(54, 54, 54, 0.6)'],
  //           borderColor: ['rgba(54, 54, 54)'],
  //           borderWidth:2.3,
  //           datalabels:{
  //             display: false
  //           },
  //         },
  //       ],

  //     },
  //     options: {
  //       plugins: {
  //         // legend: {
  //         //   display: false,
  //         // },
  //       },
  //       scales: {
  //         y: {
  //           title:{
  //             display:true,
  //             text: '#############'
  //           },
  //           beginAtZero: true,
  //         },
  //         X: {
  //           title:{
  //             display:true,
  //             text: '#############'
  //           },
  //         },
  //       },
  //     },
  //   });
  // });


  });

}

}

