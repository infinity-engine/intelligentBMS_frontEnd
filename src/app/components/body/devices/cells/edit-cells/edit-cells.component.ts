import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStoreService } from './../../../../../services/component-store.service';
import {
  UserService,
  _User,
  _UserLight,
} from './../../../../../services/user.service';
import { CellService } from './../../../../../services/cell.service';
import { CellTemplate } from './../../../../../models/CellTemplate';
import { Subscription, switchMap } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Cell, CellClass } from 'src/app/models/Cell';

@Component({
  selector: 'app-edit-cells',
  templateUrl: './edit-cells.component.html',
  styleUrls: ['./edit-cells.component.css'],
})
export class EditCellsComponent implements OnInit, OnDestroy {
  showSpinnerButton: boolean = false;
  isSaveDisabled: boolean = false;
  subs: Subscription[] = [];
  cellTemplates?: CellTemplate[] = [];
  selectedCellTemplate?: CellTemplate = undefined;
  cell: Cell = new CellClass();
  selectedUser?: _User[];
  users: _User[] = [];
  userSub: Subscription | undefined = undefined;
  cellId?: any;
  selectedUsersRead: _User[] = [];
  selectedUsersWrite: _User[] = [];
  modalBody?: string;
  modalTitle?: string;

  constructor(
    private _cellService: CellService,
    private _userService: UserService,
    private _componentStoreService: ComponentStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}
  @ViewChild('myModal') modal: any;

  ngOnInit(): void {
    let sub: Subscription = this._cellService
      .getTemplates()
      .subscribe((d: any) => {
        this.cellTemplates = d;
      });
    this.subs.push(sub);
    const os$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.cellId = params.get('cellId');
        return this._cellService.getCells(this.cellId);
      })
    );
    sub = os$.subscribe((cells: any) => {
      this.cell = cells[0];
      this.selectedUsersRead = [];
      this.selectedUsersWrite = [];
      this.cell.assignedUsers?.forEach((user: _UserLight) => {
        if (user.accessType === 'read') {
          this.selectedUsersRead.push({ _id: user._id, name: user.name });
        } else if (user.accessType === 'write') {
          this.selectedUsersWrite.push({ _id: user._id, name: user.name });
        }
      });
    });
    this.subs.push(sub);
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

  save() {
    this.showSpinnerButton = true;
    let assignedUsers: _UserLight[] = [];
    this.selectedUsersRead.forEach((user: _User) => {
      assignedUsers.push({ _id: user._id, accessType: 'read' });
    });
    this.selectedUsersWrite.forEach((user: _User) => {
      assignedUsers.push({ _id: user._id, accessType: 'write' });
    });

    this.cell.assignedUsers = assignedUsers;
    const sub = this._cellService.updateCell(this.cell).subscribe({
      next: (v) => {
        console.log(v);
        this.showSpinnerButton = false;
        this._componentStoreService.sendToastMsg({
          msg: 'Cell successfully updated.',
          color: 'green',
        });
        this.router.navigate(['../../view'], { relativeTo: this.route });
      },
      error: (e) => {
        console.error(e);
        this.showSpinnerButton = false;
        this._componentStoreService.sendToastMsg({
          msg: 'Cell update failed!',
          color: 'red',
        });
      },
    });
    this.subs.push(sub);
  }

  deleteChannel() {
    this.modalTitle = 'Alert';
    this.modalBody =
      "Are you sure you want to mark the cell for deletion? Once done you won't have any aceess to it.";
    this.modalService.open(this.modal, { centered: true }).result.then(
      (result) => {
        //console.log('accepted');
        const sub = this._cellService
          .markForDelete(this.cellId as any)
          .subscribe({
            next: (res) => {
              this._componentStoreService.sendToastMsg({
                msg: 'Cell marked for deleted!',
                color: 'green',
                timeOut: 10000,
              });
              this.router.navigate(['../../view'], { relativeTo: this.route });
            },
            error: (err) => {
              console.log(err);
              this._componentStoreService.sendToastMsg({
                msg: 'Something wrong occured!',
                color: 'red',
                timeOut: 10000,
              });
            },
          });
      },
      (reason) => {
        //console.log('closed');
      }
    );
  }

  getUsers(searchStr: string = '') {
    this.userSub?.unsubscribe();
    this.users = [];
    searchStr = searchStr.trim();
    if (searchStr.length > 0) {
      this.userSub = this._userService
        .getUsers(searchStr)
        .subscribe((users: _User[]) => {
          //console.log(this.selectedUser)
          if (this.selectedUser) {
            //remove existing users from search string
            this.selectedUser.forEach((user: _User) => {
              let remIndex = users.findIndex((u) => u._id == user._id);
              if (remIndex !== -1) {
                users.splice(remIndex, 1);
              }
            });
          }
          this.users = users;
        });
    } else {
      this.users = [];
    }
  }
  ngOnDestroy(): void {
    this.subs?.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
