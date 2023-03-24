import { ActivatedRoute, Route, Router } from '@angular/router';
import { ComponentStoreService } from './../../../../../services/component-store.service';
import { TestChamberService } from 'src/app/services/test-chamber.service';
import { Subscription, switchMap } from 'rxjs';
import {
  _User,
  UserService,
  _UserLight,
} from './../../../../../services/user.service';
import { TestChamber, _TestChamber } from './../../../../../models/TestChamber';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-test-chamber',
  templateUrl: './edit-test-chamber.component.html',
  styleUrls: ['./edit-test-chamber.component.css'],
})
export class EditTestChamberComponent implements OnInit, OnDestroy {
  chamber = new TestChamber();
  selectedUsersRead: _User[] = [];
  selectedUsersWrite: _User[] = [];
  users: _User[] = [];
  userSub: Subscription | undefined = undefined;
  isSaveDisabled: boolean = false;
  showSpinnerButton: boolean = false;
  subs: Subscription[] = [];
  chamberId?: string | null;
  modalBody?: string;
  modalTitle?: string;

  @ViewChild('myModal') modal: any;
  constructor(
    private _userService: UserService,
    private _testChamberService: TestChamberService,
    private _componentStoreService: ComponentStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    const os$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.chamberId = params.get('chamberId');
        return this._testChamberService.getChambers(this.chamberId);
      })
    );
    const sub = os$.subscribe((chambers: any) => {
      this.chamber = chambers[0];
      this.selectedUsersRead = [];
      this.selectedUsersWrite = [];
      this.chamber.assignedUsers?.forEach((user: _UserLight) => {
        if (user.accessType === 'read') {
          this.selectedUsersRead.push({ _id: user._id, name: user.name });
        } else if (user.accessType === 'write') {
          this.selectedUsersWrite.push({ _id: user._id, name: user.name });
        }
      });
    });
    this.subs.push(sub);
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
          //remove existing users from search string
          this.selectedUsersRead?.forEach((user: _User) => {
            let remIndex = users.findIndex((u) => u._id == user._id);
            if (remIndex !== -1) {
              users.splice(remIndex, 1);
            }
          });
          this.selectedUsersWrite?.forEach((user: _User) => {
            let remIndex = users.findIndex((u) => u._id == user._id);
            if (remIndex !== -1) {
              users.splice(remIndex, 1);
            }
          });
          this.users = users;
        });
    } else {
      this.users = [];
    }
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

    this.chamber.assignedUsers = assignedUsers;
    const sub = this._testChamberService
      .updateTestChamber(this.chamber)
      .subscribe({
        next: (v) => {
          console.log(v);
          this.showSpinnerButton = false;
          this._componentStoreService.sendToastMsg({
            msg: 'Chamber successfully updated.',
            color: 'green',
          });
          this.router.navigate(['../../view'], { relativeTo: this.route });
        },
        error: (e) => {
          console.error(e);
          this.showSpinnerButton = false;
          this._componentStoreService.sendToastMsg({
            msg: 'Chamber update failed!',
            color: 'red',
          });
        },
      });
    this.subs.push(sub);
  }
  deleteChannel() {
    this.modalTitle = 'Alert';
    this.modalBody =
      'Are you sure you want to delete the Test Chamber? All the test records associated with this will also get deleted.';
    this.modalService.open(this.modal, { centered: true }).result.then(
      (result) => {
        //console.log('accepted');
        const sub = this._testChamberService
          .deleteTestChamber(this.chamberId as any)
          .subscribe({
            next: (res) => {
              this._componentStoreService.sendToastMsg({
                msg: 'Chamber successfully deleted!',
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
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
    this.userSub?.unsubscribe();
  }
}
