import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent {

  servData: any;

  constructor(http: HttpClient) {
    http.get('http://127.0.0.1:8000/ViewProcs2').subscribe( (response)=>{
      this.servData = response;
      console.log(this.servData);
    })
  }
}
