import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private _http:HttpClient) { }

  predict_PII(){
  //   return this._http.get("http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22").map(result => result);
  }
}
