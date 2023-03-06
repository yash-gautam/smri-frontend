import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';
@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit {
  displayTable: boolean = false;
  contentLoaded: boolean = false;
  responsesNotSaved: boolean = true;
  saveButtonEnabled: boolean = false;

  bandValueSelectedForVerticalInt: any;
  bandValueSelectedForHorizontalInt: any;
  bandValueSelectedForProductLifecycle: any;
  rate: any;
  rank: any;

  constructor(private service:DataTransferService) { }


  organizationName: string = "";
  organizationSector: string = "";
  bandScores: { [dimension: string] : number} = {};
  i: any;


  bandValue: any = ['0','1','2','3','4','5'];
  dim:any;
  model:any;
  ratingArray:any;
  ngOnInit(): void {


    this.model= this.service.selectedModel;

    this.service.getDimensions(this.model).subscribe((data:any)=>{
      console.log("data: ",data)
      this.dim = data
      // this.ratingArray=data[0].Dim[0].Rating;

      // console.log(this.ratingArray)
      // console.log(data[0].Dim)
      // console.log("length of arr: ",this.dim.length)


      // console.log(this.service.selectedModel)

      this.service.postSurveyedModel().subscribe((data:any)=>{
        console.log(data)
      })

      this.displayTable=true;
      this.contentLoaded=true;
    })
  }

  rating: any[] = [0, 1, 2, 3, 4, 5];



  surveyResults:any={}
  showBut:any = false
  rankArray: any = [];
  getRate(i: string,j:any, index: any) {

    console.log("rank: ", this.dim[index].rank)

    this.i = this.dim[index].name;
    this.rate = j;
    this.rank = this.dim[index].rank;
    this.rankArray[index] = this.rank;

    // console.log("rank array: ", this.rankArray)

    console.log(i,j);
    var p = i.toString()
    this.surveyResults[p]=j;
    var k:any = [];
    k.push(this.surveyResults)
    console.log(k)
    console.log("survey results: ",this.surveyResults)
    console.log(Object.keys(this.surveyResults).length)
    if(Object.keys(this.surveyResults).length==this.dim.length){
      // el = document.getElementsByClassName("detectar");
      // el.classList.remove("seleccionado");
      this.showBut = true;
    }


  }

  showDescriptionBox(dimensionNumber: any, dimensionName: any){

      if(this.i==dimensionName){
        return true
      }else{
        return false
      }
  }

  post(){
    let i=0;
    for (let key in this.surveyResults) {
      let value = this.surveyResults[key];
      // let rank = this.surveyResults[]
      console.log(key , value)

      var data:any={}
      data["name"] = key;
      data["value"] = value;
      data["rank"] = this.rankArray[i++];




      console.log("data dict: ",data)

      this.service.postValue(this.service.Organisation,this.model,data).subscribe((data:any)=>{
        console.log(data);
        this.responsesNotSaved = false;
  this.saveButtonEnabled = true;
      })

  }



}
}
