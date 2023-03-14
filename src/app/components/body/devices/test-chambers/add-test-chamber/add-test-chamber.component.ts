import { ComponentStoreService } from './../../../../../services/component-store.service';
import { TestChamberService } from 'src/app/services/test-chamber.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  _User,
  UserService,
  _UserLight,
} from './../../../../../services/user.service';
import { TestChamber } from './../../../../../models/TestChamber';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-add-test-chamber',
  templateUrl: './add-test-chamber.component.html',
  styleUrls: ['./add-test-chamber.component.css'],
})
export class AddTestChamberComponent implements OnDestroy {
  chamber = new TestChamber();
  selectedUser?: _User[];
  users: _User[] = [];
  userSub: Subscription | undefined = undefined;
  isSaveDisabled: boolean = false;
  showSpinnerButton: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private _userService: UserService,
    private _testChamberService: TestChamberService,
    private _componentStoreService: ComponentStoreService
  ) {}

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

  save() {
    this.showSpinnerButton = true;
    let assignedUsers: _UserLight[] = [];
    this.users.forEach((user: _User) => {
      assignedUsers.push({ _id: user._id, accessType: 'read' });
    });
    this.chamber.assignedUsers = assignedUsers;
    const sub = this._testChamberService
      .createNewTestChamber(this.chamber)
      .subscribe({
        next: (v) => {
          console.log(v);
          this.showSpinnerButton = false;
          this._componentStoreService.sendToastMsg({
            msg: 'Chamber created successfully',
            color: 'green',
          });
        },
        error: (e) => {
          console.error(e);
          this.showSpinnerButton = false;
          this._componentStoreService.sendToastMsg({
            msg: 'Chamber creation failed!',
            color: 'red',
          });
        },
      });
    this.subs.push(sub);
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
    this.userSub?.unsubscribe();
  }
}
