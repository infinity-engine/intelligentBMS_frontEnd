import { Subscription } from 'rxjs';
import { CellService } from './../../../../services/cell.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.css'],
})
export class CellsComponent implements OnInit, OnDestroy {
  isAnyCellAvailable: boolean = false;
  subs: Subscription[] = [];
  constructor(
    private router: Router,
    private location: Location,
    private _cellService: CellService
  ) {
    //console.log(router.routerState.snapshot.url)
    if (window.location.hostname != 'localhost') {
      this.location.replaceState('./'); //on prod
    }
  }
  ngOnInit(): void {
    const sub = this._cellService.getCells().subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.isAnyCellAvailable = true;
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
