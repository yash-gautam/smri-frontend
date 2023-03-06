import { Component, Inject, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-admin-dimension',
  templateUrl: './admin-dimension.component.html',
  styleUrls: ['./admin-dimension.component.css']
})
export class AdminDimensionComponent implements OnInit {
  model: any;
  dim: any;
  ratingArray: any=[];

  constructor(private service:DataTransferService,@Inject(DOCUMENT) private _document: Document) {

  }

  ngOnInit(): void {

    this.model= this.service.adminSelectedModel;

    this.service.getDimensions(this.service.adminSelectedModel).subscribe((data:any)=>{
      this.dim = data[0].Dim
      this.ratingArray=data[0].Dim[0]?.Rating;
      console.log(data[0].Dim)})
  }
    show:any=false;
    addButton:any=true;
    saveButton:any = false;
    add(){
      this.show = true;
      this.addButton =false;
      this.saveButton= true;
    }

    name:String="";
    desc:String="";
    weight:number=0;
    cutOff:number=0;
    Rating:any=['','','','','','']

    // {
    //   "name": "string",
    //   "desc": "string",
    //   "weight": 0,
    //   "CutOff": 0,
    //   "Rating": [
    //     "string"
    //   ]
    // }
    save(){
      var dimension:any={};
      dimension["name"] = this.name;
      dimension["desc"] = this.desc;
      dimension["weight"] = this.weight;
      dimension["CutOff"] = this.cutOff;
      dimension["Rating"] = this.Rating;
      console.log(dimension);

      this.service.postDimension(this.model,dimension).subscribe((data:any)=>{
        console.log(data);
        this.model= this.service.adminSelectedModel;

    this.service.getDimensions(this.service.adminSelectedModel).subscribe((data:any)=>{
      this.dim = data[0].Dim
      console.log(this.dim)
      this.ratingArray=data[0].Dim[0]?.Rating;
      console.log(data[0].Dim)})

      })

      this.show=false;




    }

  }
