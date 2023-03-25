import { ToastMsg } from './../models/ToastMsg';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentStoreService {
  private toastMsgSource = new Subject<ToastMsg>(); //Store for pushing toast msgs
  public toastMsg$ = this.toastMsgSource.asObservable(); //use it to listen for toast.
  constructor() {}
  public sendToastMsg(msg: ToastMsg) {
    //Use it to push any msg to the store
    let defaultMsg = {
      timeOut: 5000,
      color: 'white',
      type: 'notification' as const,
    };
    let _msg = { ...defaultMsg, ...msg };
    this.toastMsgSource.next(_msg);
  }
}
