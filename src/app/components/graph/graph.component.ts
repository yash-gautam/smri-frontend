import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private service:DataTransferService) { }

  results:any;
  ngOnInit(): void {
    this.service.getResults().subscribe((data:any)=>{
      console.log(data)
      this.results = data
    })

    this.service.getDimensions(this.service.selectedModel).subscribe((data:any)=>{
      console.log(data)
    })

  }

}
