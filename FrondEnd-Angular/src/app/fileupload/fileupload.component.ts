import { Component, OnInit } from '@angular/core';
import {data} from './type';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  public data:data=new data();
  public chart:any;
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  predict(event){
    //  const headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
    //  headers.append('authentication', `Bearer ya29.c.El9BBtx9NS7cpEBvxwVYEB252CXBRFP6qtHlIoKDrtOijDAqlST-3OEMbqqSbI8fNx6xlB1-uZY_QyRY4G8CBmZGvifk6q8OoNHlT5BwlFUFC5pll6RG9r_UUhZBOB_zRA`);
     this.httpClient.post('http://localhost:5000/json_data',this.data).subscribe(
       res =>{
          let labels = [];
          let values = [];
          console.log(res);
          var obj = JSON.parse(String(res))
          //console.log(obj)  
          for(var key in obj){
            labels.push(key)
            values.push(obj[key])
          }
         swal(
           'infoTypes found',
           res.toString(), 
           'info')
           this.chart=new Chart('cavas', {
            type: 'pie',
            data: {
              labels: ['adfsdf','asdfasd'],
              datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [1,2]
              }]
            },
            options: {
              title: {
                display: true,
                text: 'Predicted PII infoTypes'
              }
            }});
      console.log(this.chart)
       },
       err =>{
         console.log(err)

       }

       )
  }

}
