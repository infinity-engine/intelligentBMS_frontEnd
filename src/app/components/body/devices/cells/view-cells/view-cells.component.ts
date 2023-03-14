import { CellService } from './../../../../../services/cell.service';
import { Subscription } from 'rxjs';
import { Cell } from './../../../../../models/Cell';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-view-cells',
  templateUrl: './view-cells.component.html',
  styleUrls: ['./view-cells.component.css'],
})
export class ViewCellsComponent implements OnInit, OnDestroy {
  availableCellsSource: Cell[] = [];
  availableCells: Cell[] = [];
  pageSize = 10;
  page = 1;
  subs: Subscription[] = [];
  searchStr: string = '';
  selectedCell: Cell | undefined = undefined;

  constructor(private _cellservice: CellService) {}
  ngOnInit(): void {
    const sub = this._cellservice.getCells().subscribe({
      next: (data: any) => {
        this.availableCellsSource = data;
        console.log(data);
        this.filter();
      },
    });
    this.subs.push(sub);
  }
  filter() {
    if (this.availableCellsSource.length > 0 && this.searchStr.length > 0) {
      this.availableCells = this.availableCellsSource.filter((item: any) => {
        if (item.cellName) {
          return item.cellName
            .toLowerCase()
            .trim()
            .includes(this.searchStr.toLowerCase().trim());
        } else {
          return false;
        }
      });
    } else {
      this.availableCells = [...this.availableCellsSource];
    }
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  selectCell(chamberId: string | undefined) {
    try {
      this.selectedCell = this.availableCells.find(
        (chamber) => chamber._id == chamberId
      );
    } catch {
      this.selectedCell = undefined;
    }
  }
}
