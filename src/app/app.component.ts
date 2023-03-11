import { TestService } from './services/test.service';
import { ToastMsg } from './models/ToastMsg';
import { ComponentStoreService } from './services/component-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'intelligentBMS';

  showToast:boolean = false;
  x:any = undefined;
  toastMsg:string|undefined = undefined;
  toastColor:string|undefined = 'black';
  selectedDate?:Date;

  constructor(private store:ComponentStoreService,
    private _testService:TestService){}

  ngOnInit(): void {
      this.store.toastMsg$.subscribe(msg=>{
        this.showToastMsg(msg);
        console.log(msg);
      })
  }
  showToastMsg(msg:ToastMsg){
    this.toastMsg = msg.msg;
    this.toastColor = msg.color;
    this.changeToastStatus(true);
    this.x = setTimeout(() => {
      this.changeToastStatus(false);
    }, msg.timeOut);
  }

  changeToastStatus(status:boolean){
    status ? clearTimeout(this.x):null;
    this.showToast = status;
  }
  
}
