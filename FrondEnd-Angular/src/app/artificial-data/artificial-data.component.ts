import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {parameters,file} from './type';
import swal from 'sweetalert';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-artificial-data',
  templateUrl: './artificial-data.component.html',
  styleUrls: ['./artificial-data.component.css']
})

export class ArtificialDataComponent implements OnInit {

  public parameters:parameters = new parameters();
  serverData:JSON;
  public options : parameters[] = [];
  public count = 1;
  public file :file = new file();
  public values = ['Name','MobileNumber','Email','zipcode','credit-card']
  public infoTypes = [1,2,3,4,5,6,20]
  

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.options.push({column1: null, column2: null});
    this.options.push({column1: null, column2: null})
  }

  generate(event){
    this.httpClient.get('http://13.86.36.68:5000/artificial_data_gen').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
      new Angular5Csv(this.serverData, this.file.name);
      swal(
        'File generated sucessfully',
         this.file.name+'.csv',
        'success'
      )
    })
  }
  setColumn1(event, item) {
    item.column1 = event.target.value;
  }
  setColumn2(event, item) {
    item.column2 = event.target.value;
  }

  countchange(event){
    this.count = event.target.value;
    let option:parameters[] =[];
    for(let i=0;i<this.count;i++){
      option.push({column1: null, column2: null});
    }
    this.options= option
    console.log(option);

  }
}

