import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';
@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  modelName: any;
  modelDesc: any;
  modelUrl: any;

  model:any={}
  modelDimensionsCount: any;
  show: boolean = false;
  res: any=[];
  showNextDimensionBox= new Array;


  constructor(private service:DataTransferService) { }

  ngOnInit(): void {


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





    dimName:any;
    dimDesc:any;
    dimWeight:any;
    dimCutoff:any;
    dimRating:any;
    dimension:any={}
    dim:any={}
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
    this.dim[j]=dimension;

    console.log(dimension)

    this.ok = true

    this.service.postDimension(this.modelName,dimension).subscribe((data: any) => {
      console.log(data);
    })

  }





}
