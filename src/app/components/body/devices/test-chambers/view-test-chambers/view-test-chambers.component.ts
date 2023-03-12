import { TestChamberService } from 'src/app/services/test-chamber.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { _TestChamber } from 'src/app/models/TestChamber';

@Component({
  selector: 'app-view-test-chambers',
  templateUrl: './view-test-chambers.component.html',
  styleUrls: ['./view-test-chambers.component.css'],
})
export class ViewTestChambersComponent implements OnInit, OnDestroy {
  availableTestChambers: _TestChamber[] = [];
  pageSize = 5;
  page = 1;
  
  constructor(private _testChamberService: TestChamberService) {}
  ngOnInit(): void {
    this._testChamberService.getChambers().subscribe({
      next: (data: any) => {
        this.availableTestChambers = data;
      },
    });
  }
  ngOnDestroy(): void {}
}
