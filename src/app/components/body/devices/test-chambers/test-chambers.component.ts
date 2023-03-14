import { Subscription } from 'rxjs';
import { TestChamberService } from './../../../../services/test-chamber.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-test-chambers',
  templateUrl: './test-chambers.component.html',
  styleUrls: ['./test-chambers.component.css'],
})
export class TestChambersComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  isAnyTestChamberAvailable: boolean = false;
  constructor(private _testChamber: TestChamberService) {}

  ngOnInit(): void {
    const sub = this._testChamber.getChambers().subscribe({
      next: (data:any) => {
        if(data.length>0){
          this.isAnyTestChamberAvailable = true;
        }
      },
    });
    this.subs.push(sub);
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
