import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  showSelectedBandValue: boolean=false;
  showSelectedBandValueArray = new Array;
  showSelectedBandValueDimensionRowArray = new Array;
  bandValueSelected: number = 0;
  bandValueSelectedArray = new Array;
  count: number = 0;
  // bandValueSelectedArray: any[] = [0,1,2,3,4,5];


  organizationName: string = '';
  organizationSector: string = '';
  rating: any[] = [0, 1, 2, 3, 4, 5];
  dimensionsArray = new Array;
  dimensionsWeightArray = new Array;
  dimensionsDescriptionArray = new Array;
  dimensionsCutoffArray = new Array;
  organizationsArray = new Array;

  allCompanyTable = new Array;
  showParticularTable = new Array;

  showParticularCompanyTable: any = false;

  booleanArray = new Array;
  trialArray: any = ['BMU', 'HERO'];

  bandValues: { [company: string] : string} = {};

  constructor(private dataService: DataTransferService) {}

  ngOnInit(): void {

  }

  getBandRating(company: any, dimension: any, rating: any){

    this.bandValueSelected=rating;
    console.log("band value selected array: ", this.bandValueSelectedArray)

    this.bandValues['count'] =  '1';

    this.getBandDetails(company,dimension,rating);
    console.log("Band selected for company: ", company, " ,dimension: ", dimension, " ,rating: ", rating)

    if(this.bandValueSelectedArray[company]==false){
      this.bandValueSelectedArray[company]=true;
    }
    else{
      this.bandValueSelectedArray[company]=false;
    }

  }

  ngifMethod(company: any, dimension: any){
    if(this.bandValues['company']==company && this.bandValues['dimension']==dimension){
      console.log("ngifmethod: ", company)
      // this.bandValues['count'] =  '1';
      console.log("ngif method count : ",this.bandValues)
      return true
    }
    else{
      return false
    }
  }

  ngifShowTick(company: any, dimension: any){
    // if(this.bandValues['company']==company && this.bandValues['dimension']==dimension && this.bandValues['count']=='1'){
    //     return true;
    // }
    // else{
    //   return false;
    // }
  }

  getBandDetails(company: any, dimension: any, rating: any){
    this.bandValues['company'] = company;
    this.bandValues['dimension'] = dimension;
    this.bandValues['dimensionValue'] = rating;
    console.log(this.bandValues)
  }


  test(){
  }

  // testSend(data: any){
  //   this.dataService.sendData(data).subscribe(response=>{
  //     console.log("data is sent", response);
  //   })
  // }

  displayTableForCompany(index: any){
    if(this.showParticularTable[index]==1){
      this.showParticularTable[index] = 0;
      this.booleanArray[index] = false;
    }
    else{
      this.showParticularTable[index] = 1;
      this.booleanArray[index] = true;
    }
  }



}
