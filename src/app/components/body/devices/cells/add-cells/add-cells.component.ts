import { UserService, _User } from './../../../../../services/user.service';
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
  selectedUser?: _User[];
  users:_User[] = [];

  constructor(private _cellService: CellService,private _userService:UserService) {}

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
    const assignedUsers = [];
    if(this.selectedUser){
      for(let user of this.selectedUser){
        assignedUsers.push({_id:user._id,accessType:'write'});
      }
    }
    this.cell.users = assignedUsers;
    const sub = this._cellService.addCell(this.cell).subscribe((d: any) => {
      this.isSaveDisabled = false;
      this.showSpinnerButton = false;
    });
    this.subs?.push(sub);
    console.log(this.selectedUser);
  }
  getUsers(searchStr:string){
    if (searchStr.length > 0){
      const sub = this._userService.getUsers(searchStr).subscribe((users:_User[])=>{
        this.users = users;
      })
    }else{
      this.users = []
    }
  }
  ngOnDestroy(): void {
    this.subs?.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
