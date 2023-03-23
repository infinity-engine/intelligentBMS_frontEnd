import { Subscription } from 'rxjs';
import { TestChamberService } from 'src/app/services/test-chamber.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { _TestChamber } from 'src/app/models/TestChamber';

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

  constructor(private _testChamberService: TestChamberService) {}
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
  }
  selectTestChamber(chamberId: string | undefined) {
    try {
      this.selectedTestChamber = this.availableTestChambers.find(
        (chamber) => chamber._id == chamberId
      );
    } catch {
      this.selectedTestChamber = undefined;
    }
  }
}
