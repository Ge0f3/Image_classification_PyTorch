import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logo: any;
  require:any;
  constructor() { }


  ngOnInit() {
    //this.logo = require('../../assets/logo.png');
  }

}
