import { Component, OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-taggin-page',
  templateUrl: './taggin-page.component.html',
  styleUrls: ['./taggin-page.component.css']
})
export class TagginPageComponent implements OnInit {
  title = 'Data Masking';
  public chart:any;
  public PII:any
  public result_json:any;
  constructor(private httpClient: HttpClient){ }

  ngOnInit() {

  }

  @ViewChild('fileInput') fileInput;
  datamask(event){
    let formData:FormData = new FormData();
    const files: FileList = this.fileInput.nativeElement.files;
    formData.append('file',files[0]);
    this.httpClient.post('http://13.86.36.68:5000/datamask',formData).subscribe(
      res => {
        console.log(res)
        this.result_json = res as JSON;
        new Angular5Csv(this.result_json, 'Masked');
        swal(
        'File generated sucessfully',
         'classified.csv',
        'success'
      )
      },
      err => {
        console.log("Something happened error !!!!")
      })

  }

}
