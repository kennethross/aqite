
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  hobbies: string[];
  skillSets: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  displayedColumns: string[] = ['email', 'name', 'phone',  'actions'];
  dataSource = new MatTableDataSource<User>([]);

  getUsers$ = this.userService.getUsers$();

  destroy$ = new Subject<void>();

  constructor(public userService: UserService, public dialog: MatDialog) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers$().pipe(
      takeUntil(this.destroy$),
    ).subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  clearTable() {
    this.dataSource.data = [];
  }

  clickedRows(user: User) {
    this.openDialog(user);
  }

  addData() {
    this.openDialog();
  }

  removeData(i: number, user: User) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Delete',
        message: `Are you sure you want to delete ${user.email}?`,
        okTitleBtn: 'Delete',
        cancelTitleBtn: 'Cancel',
      }
    });

    dialogRef.afterClosed().subscribe(refresh => {
      console.log(refresh);
      if (refresh) {
        this.userService.removeUser$(user.id).pipe(
          tap(() => this.getUsers()),
          takeUntil(this.destroy$),
        ).subscribe();
      }
    });
  }

  openDialog(data?: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data,
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(refresh => {
      if (refresh) {
        this.getUsers();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
