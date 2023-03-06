import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {
  contentLoaded: boolean = false;
  displayGridView: boolean = true;

  constructor(private dataService: DataTransferService ) { }

  ngOnInit(): void {
    this.dataService.getModels().subscribe((data: any) => {
      this.models = data[0].Models;
      console.log(data[0].Models);

      this.contentLoaded = true;
    })
  }

  models:any;

  selectedModel:any;
  selectModel(model:any){
    this.selectedModel=model;
    this.dataService.model(model);
  }

}
