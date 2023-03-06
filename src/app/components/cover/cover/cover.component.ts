import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  showCoverPage: boolean = true;
  showCoverImage: boolean = true;
  showAssessmentPage: boolean = false;
  showDimensionConfirmation: boolean = false;
  showOrganizationConfirmation: boolean = false;


  organizationName: string = '';
  organizationSector: string = 'Select';
  newDimension: any;
  newDimensionDetail: any;
  newDimensionWeight: any;
  newDimensionCutoff: any;

  numberOfDimensions: number = 0;
  numberOfOrganizations: number = 0;

  dimensionsArray =  new Array;
  dimensionsWeightArray =  new Array;
  dimensionsDescriptionArray =  new Array;
  dimensionsCutoffArray =  new Array;
  organizationsArray: any = [];
  organizationsSectorArray: any = [];

  dimensionsList: { [dimension: string] : string} = {};
  organizationsList: { [organization: string] : string} = {};

  i: any = 0;

  companiesData:any=[]
  companies:any=[]
  constructor(private dataService: DataTransferService,private fb: FormBuilder) {
          this.dataService.getCompanies().subscribe((data:any)=>{
            this.companiesData = data;
            console.log(data)
            this.companiesData.forEach((element :any)=> {
              console.log(element['Organisations'])
              this.companies.push(element['Organisations'])
            });

          })
   }
   orgGroup:FormGroup
   link:any
  ngOnInit(): void {
    this.orgGroup = new FormGroup({

      'orgName' : new FormControl('',[Validators.required]),
      'orgSector' : new FormControl('',
    [Validators.required,Validators.minLength(5)])
    })
  }



  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "arrows": true,
    autoplay:true,
    autoplayTimeout:7000,
  };



  show=false;

  enterOrganizationName(event: any){
    this.showOrganizationConfirmation=false;

    this.organizationName = event.target.value;
    console.log("org name: ", this.organizationName);

    console.log(this.companies)

    if(this.companies.includes(this.organizationName)){
      this.dataService.Organisation = this.organizationName;
      this.link = "/analysis"

      this.dataService.selectedModel = "SIRI"
    }else{
      this.p=true;
      this.link = "/model"
    }

  }

  enterOrganizationSector(event: any){
    this.showOrganizationConfirmation=false;

    this.organizationSector = event.target.value;
    console.log("org sector: ", this.organizationSector);
  }

  closeOrgDetailsModal(){
    this.showAssessmentPage = true;
  }

  organisation:any={}
  addOrganizationButton(){

    this.showOrganizationConfirmation=true;
    this.organisation['name'] = this.orgGroup.get('orgName')?.value;
    this.organisation['sector'] = this.orgGroup.get('orgSector')?.value;

    console.log(this.organisation);
    console.log(this.organisation.name);


    this.organizationName='';
    this.organizationSector='Select';

  }



  p:any=false;
  saveCompanyDetails(){
    this.showOrganizationConfirmation=true;
    this.organisation['name'] = this.orgGroup.get('orgName')?.value;
    this.organisation['sector'] = this.orgGroup.get('orgSector')?.value;

    console.log(this.organisation);
    console.log(this.organisation.name);

    if(this.p==true){
      this.dataService.postOrganizationDetails(this.organisation).subscribe(response=>{
        console.log(response);
      });
    }


    this.dataService.org(this.organisation.name);

  }



}
