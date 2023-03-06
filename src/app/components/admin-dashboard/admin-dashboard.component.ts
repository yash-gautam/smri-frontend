import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {



  modelArray = new Array(1, 1, 1, 1, 1, 1, 1, 1);
  modelArrayLength: number = 4;

  topUsersArray = new Array(1,1,1,1,1,1,1);
  topUsersArrayLength: number = 5;

  recentApplicationArray =  new Array(1,1,1,1,1,1,1,1,1);
  limitRecentApplicationRows: number = 3;


  // DUMMY DATA FOR CHART
  dataArray: number[] = [2,3,5];
  dataNameArray = new Array();
  mostUsedModelName: string = '';
  mostUsedModelIndex: number = 0;

  showCard: boolean = true;
  isExpanded: boolean = false;
  viewAllRecentAppIsClicked: boolean = false;
  models:any;
  dimensions:any=[]
  constructor(private service:DataTransferService) {}
  dim:any={}
  companies:any;
  ngOnInit(): void {


    this.service.getModels().subscribe((data:any)=>{
      this.models = data[0].Models;

      console.log(this.models)

      this.models.forEach((element:any) => {
        console.log(element.name)
        this.service.getDimensionsCount(element.name).subscribe((data:any)=>{

          this.dim[element.name] = data[0].count;
          this.dataNameArray.push(element.name)
          this.dataArray.push(data[0].count)
          console.log(this.dataNameArray)
          console.log(this.dim)

          console.log(this.dataArray)

        var myChart = new Chart("myChart", {
          type: 'pie',
          data: {
            labels: this.dataNameArray,
            datasets: [{
              label: 'My First Dataset',
              data: this.dataArray,
              backgroundColor: [
                '#ffae42',
                '#0f4d92',
                '#1b4d3e'
              ],
              hoverOffset: 4
            }]
          },
          plugins: [ChartDataLabels],
          options: {
            layout: {
              padding: {
                  // left: 100
              }
            },
            plugins: {
              legend: {
                display: true,
              },
              datalabels: {
                display: false,
                align: 'bottom',
                backgroundColor: '#ccc',
                borderRadius: 3,
                font: {
                  size: 18,
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
        });


      });




    });

    Chart.register(ChartDataLabels);


    this.service.getCompanies().subscribe((data:any)=>{
      console.log(data)
      this.companies = data;
    })

    var dataArraySorted: number[] = this.dataArray.sort((n1,n2) => n1 - n2);

    console.log("sorted array: "+dataArraySorted[dataArraySorted.length-1]);


  }



  expandModelList() {
    if (this.modelArrayLength == 4) {
      this.modelArrayLength = this.modelArray.length;
    } else if (this.modelArrayLength > 4) {
      this.modelArrayLength = 4;
    }

    if (this.isExpanded == true) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }





  }

  viewAllRecentApplications(){
    if(this.viewAllRecentAppIsClicked==false){
      this.viewAllRecentAppIsClicked=true;
      this.limitRecentApplicationRows = this.recentApplicationArray.length;
    }else if(this.viewAllRecentAppIsClicked==true){
      this.viewAllRecentAppIsClicked=false;
      this.limitRecentApplicationRows=3;
    }
  }


  ngDoCheck(){

  }


















getModelName(event:any){
  this.modelName = event.target.value;

  console.log(this.modelName);
}
getModelDesc(event:any){
  this.modelDesc = event.target.value;

  console.log(this.modelDesc);
}
getModelUrl(event:any){
  this.modelUrl = event.target.value;

  console.log(this.modelUrl);
}

getModelDimensions(event:any){
  this.modelDimensionsCount= event.target.value;

  console.log(this.modelDimensionsCount);
}

goToNextDimension(dimensionNumber: any){
}

addModel(){

  this.model["name"] = this.modelName;
  this.model["description"] = this.modelDesc;
  this.model["url"] = this.modelUrl;
  this.model["dimensions"] = this.modelDimensionsCount;
  console.log(this.model);
  console.log(this.modelDimensionsCount);
  this.service.postModel(this.model).subscribe((data: any) => {
    console.log(data);
  })

  this.showNextDimensionBox.push("true");
  this.show = true;

  console.log(this.res)



  for (let index = 1; index <= this.modelDimensionsCount; index++) {
    this.res.push(index)
   console.log(index)

  }

}

sendmodel(i:any){
  this.service.adminmodel(i);
}

modelName: any;
modelDesc: any;
modelUrl: any;

model:any={}
modelDimensionsCount: any;
show: boolean = false;
res: any=[];
showNextDimensionBox= new Array;



  dimName:any;
  dimDesc:any;
  dimWeight:any;
  dimCutoff:any;
  dimRating:any;
  dimension:any={}
  dim1:any={}
  Rating:any=[]

getDimensionName(j:any,event:any){
  this.dimName = event.target.value;

}
getDimensionDesc(j:any,event:any){
  this.dimDesc = event.target.value;

}
getDimensionWeight(event:any){
  this.dimWeight = event.target.value;


}
getDimensionCutoff(event:any){
  this.dimCutoff = event.target.value;

}
rate:any;
getDimensionRating(j:any,event:any){
  this.dimRating = event.target.value;


  this.Rating.push(this.dimRating)

  this.rate = this.Rating;

}
ok:any=false
add(j:any){

  var dimension={
    'name':this.dimName,
    'desc':this.dimDesc,
    'weight':this.dimWeight,
    'CutOff':this.dimCutoff,
    'Rating':this.rate
  }

  this.Rating=[]
  this.dim1[j]=dimension;

  console.log(dimension)

  this.ok = true

  this.service.postDimension(this.modelName,dimension).subscribe((data: any) => {
    console.log(data);
  })

}

}
