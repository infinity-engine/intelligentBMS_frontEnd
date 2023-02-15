import { CellService } from './../../../../../services/cell.service';
import { CellTemplate } from './../../../../../models/CellTemplate';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cell, CellClass } from 'src/app/models/Cell';

@Component({
  selector: 'app-add-cells',
  templateUrl: './add-cells.component.html',
  styleUrls: ['./add-cells.component.css'],
})
export class AddCellsComponent implements OnInit, OnDestroy {
  showSpinnerButton: boolean = false;
  isSaveDisabled: boolean = false;
  subs?: Subscription[];
  cellTemplates?: CellTemplate[] = [];
  selectedCellTemplate?: CellTemplate = undefined;
  cell: Cell = new CellClass();

  constructor(private _cellService: CellService) {}

  ngOnInit(): void {
    const sub: Subscription = this._cellService
      .getTemplates()
      .subscribe((d: any) => {
        this.cellTemplates = d;
      });
    this.cell.cellQuantity = 1;
    this.subs?.push(sub);
  }
  populate() {
    console.log(this.selectedCellTemplate);
    this.cell.manufacturer = this.selectedCellTemplate?.manufacturer;
    this.cell.type = this.selectedCellTemplate?.type;
    this.cell.formFactor = this.selectedCellTemplate?.formFactor;
    this.cell.cellChemistry = this.selectedCellTemplate?.cellChemistry;
    this.cell.nomVolt = this.selectedCellTemplate?.nomVoltage;
    this.cell.nomCap = this.selectedCellTemplate?.nomCapacity;
    this.cell.nomCurr = this.selectedCellTemplate?.nomCurrent;
    this.cell.maxVolt = this.selectedCellTemplate?.maxVoltage;
    this.cell.minVolt = this.selectedCellTemplate?.minVoltage;
  }
  save(myForm: NgForm) {
    this.isSaveDisabled = true;
    this.showSpinnerButton = true;
    const sub = this._cellService.addCell(this.cell).subscribe((d: any) => {
      this.isSaveDisabled = false;
      this.showSpinnerButton = false;
    });
    this.subs?.push(sub);
  }
  ngOnDestroy(): void {
    this.subs?.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
