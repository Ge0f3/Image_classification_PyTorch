import { Component, OnInit ,ViewChild} from '@angular/core';
import {data} from './type';
import swal from 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  title = 'Data Classification/Tagging';
  public data:data=new data();
  public chart:any;
  public PII:any
  public result_json:any;
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  @ViewChild('fileInput') fileInput;
  datatag(event){
    let formData:FormData = new FormData();
    const files: FileList = this.fileInput.nativeElement.files;
    formData.append('file',files[0]);
    this.httpClient.post('http://localhost:5000/datatag',formData).subscribe(
      res => {
        console.log(res)
        this.result_json = res as JSON;
      },
      err => {
        console.log("Something happened error !!!!")
      })

  }

  download(event){
    new Angular5Csv(this.result_json, 'classified');
      swal(
        'File generated sucessfully',
         'classified.csv',
        'success'
      )

  }

  visualize(event){
    this.httpClient.get('http://13.86.36.68:5000/visualize').subscribe(
      res =>{
        let temp_max = res['list'].map(res => res.main.temp_max);
        let temp_min = res['list'].map(res => res.main.temp_min);
        let alldates = res['list'].map(res => res.dt)
        let labels = ["US_SOCIAL_SECURITY_NUMBER", "LAST_NAME", "FIRST_NAME", "PERSON_NAME", "CREDIT_CARD_NUMBER"]
        let data = [247, 247, 247, 247, 12]
        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })
        this.chart = new Chart('canvas', {
          type: 'barng',
          data: {
            labels: labels,
            datasets: [
              { 
                data: data,
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
        console.log(weatherDates)
      },
      err =>{
        console.log(err)
      }

    )
  }
  get_json(event){
    this.httpClient.get('http://13.86.36.68:5000/json_file').subscribe(
      res =>{
        let values = [];
        let labels = [];
        for(var key in res){
          values.push(key);
          labels.push(res[key]);
        }
        this.PII = new Chart('canvas1', {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              { 
                data: values,
                borderColor: "#3cba9f",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
        console.log(this.PII)
        console.log(values);
        swal(labels.toString())
      },
      err =>{
        console.log(err)

      }

      )
    
  }

  predict(event){
    //  const headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
    //  headers.append('authentication', `Bearer ya29.c.El9BBtx9NS7cpEBvxwVYEB252CXBRFP6qtHlIoKDrtOijDAqlST-3OEMbqqSbI8fNx6xlB1-uZY_QyRY4G8CBmZGvifk6q8OoNHlT5BwlFUFC5pll6RG9r_UUhZBOB_zRA`);
     this.httpClient.post('http://13.86.36.68:5000/predict',this.data).subscribe(
       res =>{
          console.log(res);
         swal(
           'infoTypes found',
           res.toString(), 
           'info')
       },
       err =>{
         console.log(err)

       }

       )
  }

  json_data(event){
    //  const headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
    //  headers.append('authentication', `Bearer ya29.c.El9BBtx9NS7cpEBvxwVYEB252CXBRFP6qtHlIoKDrtOijDAqlST-3OEMbqqSbI8fNx6xlB1-uZY_QyRY4G8CBmZGvifk6q8OoNHlT5BwlFUFC5pll6RG9r_UUhZBOB_zRA`);
     this.httpClient.post('http://13.86.36.68:5000/json_data',this.data).subscribe(
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
          console.log(labels)
          console.log(values)
         swal(
           'infoTypes found',
           res.toString(), 
           'info')
       },
       err =>{
         console.log(err)

       }

       )
  }
  file_upload(event){
    //  const headers = new Headers();
    //  headers.append('Content-Type', 'application/json');
    //  headers.append('authentication', `Bearer ya29.c.El9BBtx9NS7cpEBvxwVYEB252CXBRFP6qtHlIoKDrtOijDAqlST-3OEMbqqSbI8fNx6xlB1-uZY_QyRY4G8CBmZGvifk6q8OoNHlT5BwlFUFC5pll6RG9r_UUhZBOB_zRA`);
     this.httpClient.post('http://13.86.36.68:5000/file_upload',this.data).subscribe(
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
          console.log(labels)
          console.log(values)
         swal(
           'infoTypes found',
           res.toString(), 
           'info')
       },
       err =>{
         console.log(err)

       }

       )
  }
  

}


