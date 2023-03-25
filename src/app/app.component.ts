import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { TestService } from './services/test.service';
import { ToastMsg } from './models/ToastMsg';
import { ComponentStoreService } from './services/component-store.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'intelligentBMS';

  showToast: boolean = false;
  x: any = undefined;
  toastMsg: string | undefined = undefined;
  toastColor: string | undefined = 'black';
  selectedDate?: Date;
  subs: Subscription[] = [];
  useClass: boolean = true;

  constructor(
    private store: ComponentStoreService,
    private _testService: TestService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let sub = this.store.toastMsg$.subscribe((msg) => {
      this.showToastMsg(msg);
      //console.log(msg);
    });
    this.subs.push(sub);
    sub = this.store.styleMsg$.subscribe((msg) => {
      setTimeout(() => {
        if (msg) {
          this.useClass = false;
        } else {
          this.useClass = true;
        }
      });
    });
    this.subs.push(sub);
  }
  showToastMsg(msg: ToastMsg) {
    this.toastMsg = msg.msg;
    this.toastColor = msg.color;
    this.changeToastStatus(true);
    this.x = setTimeout(() => {
      this.changeToastStatus(false);
    }, msg.timeOut);
  }

  changeToastStatus(status: boolean) {
    status ? clearTimeout(this.x) : null;
    this.showToast = status;
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
