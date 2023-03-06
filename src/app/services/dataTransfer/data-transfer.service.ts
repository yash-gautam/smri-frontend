import { Injectable } from '@angular/core';
import { Results } from 'src/app/models/data-interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const enum endpoint{
  // POST
  testSend = '/testSend',
  dimensionsCompaniesCount = '/postDimensionsCompaniesCount',
  postOrgDetails = '/',
  postDimensionDetails = '/',

  //GET
  getOrganizationDetails = '/',
  getDimensionDetails = '/',
  getTestData = '/test',
  getTestData1 = '/addParentNode',

  //NEW
  getCompanyTitles = '/getCompanies',
  getAnalysisData = '/getAnalysisData',
  getAnalysisDataForCompany = '/getAnalysisDataForCompany',
  getDimensionData = '/getDimensionDetails',
}


@Injectable({
  providedIn: 'root'
})
export class DataTransferService {





  // private URL = 'https://siri-fastapi.herokuapp.com';
  private URL = 'http://127.0.0.1:5000';
  dimensionsArray = new Array;
  dimensionsWeightArray = new Array;
  dimensionsDescriptionArray = new Array;
  dimensionsCutoffArray = new Array;
  organizationsArray = new Array;




  constructor(private http: HttpClient) { }

  //GET METHODS

  organisationSurvyedValuesArray:any=[]

  getCompanyTitles(model: any): Observable<any>{
    return this.http.get<any>(`${this.URL}${endpoint.getCompanyTitles}/${model}`, {
    });
  }

  getAnalysisData(model: any): Observable<any>{
    return this.http.get<any>(`${this.URL}${endpoint.getAnalysisData}/${model}`, {
    });
  }

  getDimensionData(model: any): Observable<any>{
    return this.http.get<any>(`${this.URL}${endpoint.getDimensionData}/${model}`, {
    });
  }

  // getTestData(): Observable<any>{
  //   return this.http.get<any>(`${this.URL}${endpoint.getTestData}`, {
  //   });
  // }

  // getOrganizationDetails(): Observable<any>{
  //   return this.http.get<any>(`${this.URL}${endpoint.getOrganizationDetails}`, {
  //   });
  // }

  // getDimensionDetails(): Observable<any>{
  //   return this.http.get<any>(`${this.URL}${endpoint.getDimensionDetails}`, {
  //   });
  // }




  //POST METHODS

  postOrganizationDetails(organisation:any): Observable<any>{
    console.log(organisation)
    return this.http.post<any>(`${this.URL}/postOrganisation/${organisation.name}?sector=${organisation.sector}&revenue=${organisation.revenue}&employeeCount=${organisation.employeeCount}`, {
    });
  }



  postDimensionDetails(title:any,cut_off:any,weight:any,desc:any): Observable<any>{
    return this.http.post<any>(`${this.URL}/postDimension?dimensionTitle=${title}&weight=${weight}&cut_off=${cut_off}&description=${desc}`, {
    });
  }

  getModels(){
    return this.http.get(`https://siri-fastapi.herokuapp.com/getModels`);
  }

  postModel(data:any){
    console.log(data)
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json')}
      return this.http.post(`${this.URL}/postModel`,data,config)
  }

  excelPostOrganizationDetails(organisation:any, sector: any): Observable<any>{
    return this.http.post<any>(`${this.URL}/postOrganisation/${organisation}?sector=${sector}`, {
    });
  }

  excelPostSurveyedModel(organisation:any, model: any): Observable<any>{
    // return this.http.post<any>(`${this.URL}/postOrganisation/${organisation}?sector=${sector}`, {
    // });
    return this.http.post(`${this.URL}/postSurveyedResult?orgName=${organisation}&sname=${model}`,{})
  }
  postDimension(Modelname:string,data:any){
    console.log(data)
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json')}
    return this.http.post(`${this.URL}/postDimension/?name=${Modelname}`,data,config)
  }

  getDimensions(model:any){
    return this.http.get(`${this.URL}/getDimensions?name=${model}`);
  }

  getDimensionsCount(model:any){
    return this.http.get(`${this.URL}/getDimensionsCount?name=${model}`);
  }

  getCompanies(){
    return this.http.get(`${this.URL}/getCompanies`)
  }



  selectedModel:any="SIRI";
  adminSelectedModel:any

  model(model:any){
    this.selectedModel=model;
    return model;
  }

  adminmodel(model:any){
    this.adminSelectedModel=model.name;
    console.log(this.adminSelectedModel)
    return model;
  }

  Organisation:any;

  org(orgName:any){
    this.Organisation=orgName;
    return this.Organisation;
  }

  postValue(orgName:any,modelName:any,data:any){
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json')}
    return this.http.post(`${this.URL}/postResults?orgname=${orgName}&modelName=${modelName}`,data,config)
  }

  postSurveyedModel(){
    console.log(this.selectedModel)
    console.log(this.Organisation)
    return this.http.post(`${this.URL}/postSurveyedResult?orgName=${this.Organisation}&sname=${this.selectedModel}`,{})
  }

  getResults(){
    console.log(this.selectedModel)
    console.log(this.Organisation)
    return this.http.get(`${this.URL}/getResults?orgName=${this.Organisation}&sname=${this.selectedModel}`,{})
  }




}
