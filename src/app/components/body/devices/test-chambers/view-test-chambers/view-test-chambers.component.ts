import { ComponentStoreService } from './../../../../../services/component-store.service';
import { Subscription } from 'rxjs';
import { TestChamberService } from 'src/app/services/test-chamber.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { _TestChamber } from 'src/app/models/TestChamber';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-view-test-chambers',
  templateUrl: './view-test-chambers.component.html',
  styleUrls: ['./view-test-chambers.component.css'],
})
export class ViewTestChambersComponent implements OnInit, OnDestroy {
  availableTestChambersSource: _TestChamber[] = [];
  availableTestChambers: _TestChamber[] = [];
  pageSize = 5;
  page = 1;
  subs: Subscription[] = [];
  searchStr: string = '';
  selectedTestChamber: _TestChamber | undefined = undefined;
  placeHolderMsg: string = "You don't have any Test Chambers.";
  isApiVisible: boolean = false;
  isConnected: boolean = false;
  isConnectedIntervalId: any;
  connSub?: Subscription;

  constructor(
    private _testChamberService: TestChamberService,
    private clipboard: Clipboard,
    private componentStoreService: ComponentStoreService
  ) {}
  ngOnInit(): void {
    this.placeHolderMsg = 'Getting the information...';
    const sub = this._testChamberService.getChambers().subscribe({
      next: (data: any) => {
        this.availableTestChambersSource = data;
        //console.log(data)
        this.filter();
        if (this.availableTestChambersSource.length == 0) {
          this.placeHolderMsg = "You don't have any Test Chambers.";
        }
      },
      error: (err) => {
        this.placeHolderMsg = "It's weired, something wrong happened!";
      },
    });
    this.subs.push(sub);

    this.updateConnection();

    this.isConnectedIntervalId = setInterval(
      () => this.updateConnection(),
      10000
    );
  }

  updateConnection() {
    if (this.selectedTestChamber?._id) {
      this.connSub?.unsubscribe();
      this.connSub = this._testChamberService
        .getConnectionStatus(this.selectedTestChamber._id as any)
        .subscribe({
          next: (pay: any) => {
            this.isConnected = pay.isConnected;
            this.connSub?.unsubscribe();
          },
          error: (err) => {
            this.isConnected = false;
          },
        });
    }
  }

  filter() {
    if (
      this.availableTestChambersSource.length > 0 &&
      this.searchStr.length > 0
    ) {
      this.availableTestChambers = this.availableTestChambersSource.filter(
        (item: any) => {
          if (item.name) {
            return item.name
              .toLowerCase()
              .trim()
              .includes(this.searchStr.toLowerCase().trim());
          } else {
            return false;
          }
        }
      );
    } else {
      this.availableTestChambers = [...this.availableTestChambersSource];
    }
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
    this.connSub?.unsubscribe();
    clearInterval(this.isConnectedIntervalId);
  }
  selectTestChamber(chamberId: string | undefined) {
    try {
      this.selectedTestChamber = this.availableTestChambers.find(
        (chamber) => chamber._id == chamberId
      );
      if (this.selectedTestChamber) {
        this.selectedTestChamber.apiKey = '**********';
      }
    } catch {
      this.selectedTestChamber = undefined;
    }
  }
  changeView() {
    this.isApiVisible = !this.isApiVisible;
    if (this.isApiVisible) {
      const sub = this._testChamberService
        .getAPIKey(this.selectedTestChamber?._id as any)
        .subscribe((api: any) => {
          if (this.selectedTestChamber) {
            this.selectedTestChamber.apiKey = api.apiKey;
          }
        });
      this.subs.push(sub);
    } else {
      if (this.selectedTestChamber)
        this.selectedTestChamber.apiKey = '**********';
    }
  }
  clipBoard() {
    if (this.selectedTestChamber)
      this.clipboard.copy(this.selectedTestChamber.apiKey as any);
    this.componentStoreService.sendToastMsg({
      msg: 'API Key copied to clipboard',
      timeOut: 2000,
      color: 'black',
    });
  }
}
