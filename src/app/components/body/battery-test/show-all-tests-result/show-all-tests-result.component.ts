import { TestChamberService } from 'src/app/services/test-chamber.service';
import { _TestResultLight } from './../../../../models/TestResult';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-all-tests-result',
  templateUrl: './show-all-tests-result.component.html',
  styleUrls: ['./show-all-tests-result.component.css'],
})
export class ShowAllTestsResultComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  allTestsSource: _TestResultLight[] = [];
  allTests: _TestResultLight[] = [];
  pageSize = 10;
  page = 1;
  searchId: string = '';
  isTestInfoViewEnabled: boolean = false;

  constructor(
    private _testChamberService: TestChamberService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (window.location.hostname != 'localhost') {
      this.location.replaceState('./'); //on prod
    }
    const sub = this._testChamberService
      .getAllTests()
      .subscribe((tests: any) => {
        this.allTestsSource = tests;
        this.filter();
      });
    this.subs.push(sub);
  }

  filter() {
    if (this.allTestsSource.length > 0 && this.searchId.length > 0) {
      this.allTests = this.allTestsSource.filter((item: _TestResultLight) => {
        if (item._id) {
          return item._id
            .toLowerCase()
            .trim()
            .includes(this.searchId.toLowerCase().trim());
        } else {
          return false;
        }
      });
    } else {
      this.allTests = [...this.allTestsSource];
    }
  }
  ngOnDestroy(): void {
    this.subs?.forEach((subs) => {
      subs.unsubscribe();
    });
  }
  changeView() {
    this.isTestInfoViewEnabled = !this.isTestInfoViewEnabled;
  }
}
