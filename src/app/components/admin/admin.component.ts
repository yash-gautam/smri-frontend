import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  modelName: string =""

  modelForm:FormGroup

  constructor(private service:DataTransferService) { }

  ngOnInit(): void {



    this.modelForm = new FormGroup({
      "name": new FormControl("",Validators.required),
      "description": new FormControl("",Validators.required),

      "dimensions": new FormControl("",Validators.required)
    })

  }

  showDimensionTable: boolean = false;
  showDefaultContent: boolean = true;

  modelDesc: any;
  modelUrl: any;

  model:any={}
  modelDimensionsCount: any;


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

  addModel(){
    this.showDimensionTable=true;
    this.showDefaultContent=false;

    console.log(this.modelForm.value)
    this.service.postModel(this.modelForm.value).subscribe((data:any)=>{
      console.log(data)
    })

  }





selectedModel:any;
  selectModel(model:any){
    this.selectedModel=model;
    this.service.model(model);
  }
}
