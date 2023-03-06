import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { post } from 'jquery';
import { DataTransferService } from 'src/app/services/dataTransfer/data-transfer.service';

@Component({
  selector: 'app-new-survey-page',
  templateUrl: './new-survey-page.component.html',
  styleUrls: ['./new-survey-page.component.css']
})
export class NewSurveyPageComponent implements OnInit {


  booleanValue=[[false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false],
  [false,false,false,false,false,false]]
  rank: any;
  constructor(private service:DataTransferService,
    private router: Router) { }

  ngOnInit(): void {

    this.complete = this.complete
    this.share = this.share + 0
     this.width= this.complete + "%";
     this.sha = this.share + "%";


     this.service.postSurveyedModel().subscribe((data:any)=>{
      console.log(data)
    })


  }
  complete = 100
  share = 0
  sha:any =0
  nill=0
  width:any = 100

  dimension=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  dimDesc=[

    "Vertical Integration is the integration of processes and systems across all hierarchical levels of the automation pyramid within a facility to establish a connected, end-end data thread.",

    "Horizontal Integration is the integration of enterprise processes across the organisation and with stakeholders along the value chain.",

   "Integrated Product Cycle is the integration of people, processes and systems along the   entire product lifecycle, encompassing the stages of design and development, engineering, production, customer use, service, and disposal.",

   "Shop Floor Automation is the application of technology to monitor, control and execute the  production and delivery of products and services, within the location where the production and management of goods is carried out.",

   "Enterprise Automation is the application of technology to monitor, control and execute  processes, within the location where the administrative work is carried out. These processes include, but are not limited to, sales and marketing, demand planning, procurement, and human resource management and planning.",


   "Facility Automation is the application of technology to monitor, control and execute processes within the physical building and/or premises where the production area is located. These processes include but are not limited to the management of HVAC, chiller, security, and lighting systems.",


   "Shop Floor connectivity is the interconnection of equipment, machines and computer-based systems, to enable communication and seamless data exchange, within the location where the production and management of goods is carried out.",


   "Enterprise Connectivity is the interconnection of equipment, machines and computer-based systems, to enable communication and seamless data exchange",


   "Facility Connectivity is the interconnection of equipment, machines and computer-based systems, to enable communication and seamless data exchange, within the physical building and/or land plot where the production area is located. ",


   "Shop Floor Intelligence is the processing and analysis of data to optimise existing processes and create new applications, products, and services, within the location where the production and management of goods is carried out.",


   "Enterprise Intelligence is the processing and analysis of data to optimise existing administrative processes and create new applications, products an services.",


   "Facility Intelligence is the processing and analysis of data to optimise existing processes and create new applications, products and services, within the physical building and premises where the production area is located.",


   "Workforce Learning & Development (“L&D”) is a system of processes and programmes that aims to develop the workforce’s capabilities, skills and competencies to achieve organisational excellence.",


   "Leadership Competency refers to the readiness of the management core to leverage the latest trends and technologies for the continued relevance and competitiveness of the organisation.",


   "Inter- and Intra- Company Collaboration is the process of working together, through cross functional teams and with external partners, to achieve a shared vision and purpose.",


   "Strategy & Governance is the design and execution of a plan of action to achieve a set of long-term goals. It includes identifying priorities, formulating a roadmap, and developing a system of rules, practices and processes to translate a vision into business value.",


   ]

   dimValues=[

    ["0-Production is not explicitly defined",

  "1-Executed by humans, with the support of analogue tools",

  "2-Completed by humans with the support of digital tools",

  "3-Securely integrated across all hierarchical levels,managed by humans",

  "4-Processes and systems are automated, with limited human intervention",

  "5-Processes and systems are actively analysing and reacting to data"

  ],



    ["0-Production is not explicitly defined",

  "1-Executed by humans, with the support of analogue tools",

  "2-Completed by humans with the support of digital tools",

  "3-Securely integrated across business partners and clients, data exchange is managed by humans",

  "4-Processes and systems are automated, with limited human intervention",

  "5-Processes and systems are actively analysing and reacting to data"

  ],



  ["0-Processes is not explicitly defined",

"1-Executed by humans, with the support of analogue tools",

"2-Completed by humans, with the support of digital tools",

"3-Securely integrated across all stages of the product lifecycle, information exchange is managed by humans",

"4-Processes and systems are automated, with limited human intervention",

"5-Processes and systems are actively analysing and reacting to data",
],




 ["0-Executed by humans.",

"1-Partially automated, with significant human intervention",

"2-Automated, with minimal human intervention.",

"3- Fully automated, Human intervention needed for unplanned events",

"4-Plug-and-play automated, Limited human intervention for unplanned events",

"5-Production and support processes are highly autonomous networks",
],



["0-Executed by humans.",

"1-Partially automated, with significant human intervention.",

"2-Automated, with minimal human intervention.",

"3-Fully automated, Human intervention needed for unplanned events",

"4-Automated and adaptable, Limited human intervention for unplanned events",

"5-Flexible and formally integrated for dynamic, cross-domain interactions",
],


["0-Executed by humans.",

"1-Partially automated, with significant human intervention.",

"2-Automated, with minimal human intervention.",

"3-Fully automated, Human intervention needed for unplanned events",

"4-Automated and adaptable, Limited human intervention for unplanned events",

"5-Flexible and formally integrated for dynamic, cross-domain interactions",
],



["0-Systems are not connected",

"1-Connected via multiple communication technologies,with significant restrictions.",

"2-Connected via multiple communication technologies ,without significant restrictions.",

"3- systems are secure.",

"4-Systems are secure and capable of realtime communication",

"5-systems are secure, capable of realtime communication, and scalable.",
],



["0-Systems are not connected",

"1-Connected via multiple communication technologies,with significant restrictions.",

"2-Connected via multiple communication technologies ,without significant restrictions.",

"3-systems are secure.",

"4-Systems are secure and capable of realtime communication",

"5-systems are secure, capable of realtime communication, and scalable.",
],



["0-Systems are not connected",

"1-Connected via multiple communication technologies,with significant restrictions.",

"2-Connected via multiple communication technologies ,without significant restrictions.",

"3-systems are secure.",

"4-Systems are secure and capable of realtime communication",

"5-systems are secure, capable of realtime communication, and scalable.",
],


["0-No electronic or digital devices are used.",

"1-Perform tasks based on pre-programmed logic",

"2-Able to identify deviations",

"3-Able to identify deviations and diagnose potential causes",

"4-Able to diagnose problems and predict future states of assets and systems.",

"5-Able to diagnose problems and adapt to changes.",
],



["0-No electronic or digital devices are used.",

"1-Perform tasks based on pre-programmed logic",

"2-Able to identify deviations",

"3-Able to identify deviations and diagnose potential causes",

"4-Able to diagnose problems and predict future states of assets and systems.",

"5-Able to diagnose problems and adapt to changes.",
],



["0-No electronic or digital devices are used.",

"1-Perform tasks based on pre-programmed logic",

"2-Able to identify deviations",

"3-Able to identify deviations and diagnose potential causes",

"4-Able to diagnose problems and predict future states of assets and systems.",

"5-Able to diagnose problems and adapt to changes.",
],



["0-No formal L&D curriculum to on-board and train the workforce",

"1-Formal L&D curriculum with limited skills acquisition.",

"2-Structured L&D curriculum to enable the constant learning and improvement of skills",

"3-continuous L&D curriculum with organisational objectives and career development pathways",

"4-Formal feedback channels are in place to allow integrated L&D programmes",

"5-Adaptive L&D programmes.",
],



["0-Unfamiliar with the most recent trends and technologies",

"1-Familiar with the latest concepts through ad hoc channels",

"2-Familiar with the latest concepts formal channels and avenues",

"3-Management is reliant on external partners to develop initiatives",

"4-Management enables improvements across multiple areas",

"5-Management is able to augment its improvement initiatives as the latest concepts change",
],



["0-Sharing across teams happens on an informal basis.",

"1-Formal channels are established for sharing information",

"2-Formal channels are established to allow teams to work together on task and project",

"3-Teams are empowered by the organisation to make adjustments that will facilitate cooperation",

"4-Teams are empowered by the organisation to share resources on discrete and longer-term",

"5-Formal channels are established to enable dynamically forming teams",
],



["0-Transformation towards a Factory/Plant-of-the-Future (P0F) is not present",

"1-Transformation towards a Factory/POF has been formally identified",

"2-Transformation towards a Factory/POF developed by a dedicated team",

"3-Transformation towards a Factory/POF formally implemented in least one functional area",

"4-Transformation towards a Factory/POF is expanded to include more than one functional area.",

"5-Transformation initiative towards a Factory/POF is refreshed and updated dynamically.",
],
   ]

  optionColor:any = "black"
  set:any ={}
  len:any=0
  fontweight:any


   dimensions=['Vertical Integration',
  'Horizontal Integration',
'Integrated Product Cycle',
'Shop Floor Automation',
'Enterprise Automation',
'Facility Automation',
'Shop Floor connectivity',
'Enterprise Connectivity',
'Facility Connectivity',
'Shop Floor Intelligence',
'Enterprise Intelligence',
'Facility Intelligence',
'Workforce Learning & Development',
'Leadership Competency',
'Inter- and Intra- Company Collaboration',
'Strategy & Governance'
]

  btn(event:any,k:any,i:any){


    // name of the dimension
    //k = surevyvalue
    //i = rank
  this.set[event.target.name] = k;
  this.rank = i-1;

  this.rankArray[i-1] = this.rank;
  console.log(this.rankArray)
  console.log("name : " +  this.dimensions[i] + " value : " + k + " rank "  + i )
  console.log(this.set)
  this.len = Object.keys(this.set).length
  console.log(Object.keys(this.set).length)
  this.share = Object.keys(this.set).length*6.25

  this.width= (this.complete - this.share) + "%"  ;
  this.sha = (this.nill + this.share) + "%"
console.log(this.sha)
    console.log(k + "==" + "dimension" + i)
    window.scrollBy(0,550)

    for(let j:any=0;j<this.booleanValue[i-1].length;j++){
    this.booleanValue[i-1][j] = false;}
  this.booleanValue[i-1][k] = true;

  // console.log(this.booleanValue[i])

      console.log(this.set)

}
postDataBoolean=false
rankArray:any=[]
post(){

    let i=0;
    for (let key in this.set) {
      let value = this.set[key];
      // let rank = this.surveyResults[]
      console.log(key , value)

      var data:any={}
      data["name"] = key;
      data["value"] = value;
      data["rank"] = this.rankArray[i++];
      this.service.organisationSurvyedValuesArray[i] = value;

      // console.log("data dict: ",data)

      this.service.postValue(this.service.Organisation,'SIRI',data).subscribe((data:any)=>{
        i++;
        this.postDataBoolean=true;
        console.log(data);
        if(i==16){
          this.router.navigate(['/analysis'])
        }

      })


  }
}


}
