import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent implements OnInit {

  serverData:JSON;

  constructor(private httpClient: HttpClient){ }

  ngOnInit() {
    this.sayHello()
  }

  sayHello() {
    this.httpClient.get('http://13.86.36.68:5000/retrieve').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    })
  }

}
