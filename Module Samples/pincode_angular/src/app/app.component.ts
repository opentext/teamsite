import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { UtilService } from 'src/services/utill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  title = 'India Pincodes';
  pincode: Number | undefined ;
  success: any = true;
  result : any;
  po: any;

  constructor(private http: HttpClient,private utilService: UtilService, private elementRef: ElementRef){

  }
  ngOnInit(): void {
    const appId = this.elementRef.nativeElement.getAttribute("app-id");
    this.utilService.setAppId(appId);
    const iw:any = window['iw'];
    this.title = iw.getPropertyValue(this.utilService.getAppId(), 'DT01');
  }

  getPinCodeResults(pincode : any){
    this.success = "loading";
    if(pincode || pincode.length>0){
    this.http.get("https://api.postalpincode.in/pincode/"+pincode).subscribe(result => {
      this.result = result;
      if(this.result) {
        if(this.result[0].Status === "Success"){
         this.success = true;
         this.po = this.result[0].PostOffice[0];
        } else {
         this.success = false;
         this.po = null;
        }
      } else {
        this.success = false;
      }
     })
    }
  }


}
