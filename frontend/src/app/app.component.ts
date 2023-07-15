import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject, catchError, takeUntil, tap } from 'rxjs';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  displayedColumns: string[] = ['email', 'name', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  getUsers$ = this.userService.getUsers$();

  isLoading$ = new BehaviorSubject<boolean>(true);

  destroy$ = new Subject<void>();

  constructor(
    private _snackBar: MatSnackBar,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUsers$()
      .pipe(
        tap(() => this.isLoading$.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((users) => {
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
      },
    });

    dialogRef.afterClosed().subscribe((refresh) => {
      console.log(refresh);
      if (refresh) {
        this.userService
          .removeUser$(user.id)
          .pipe(
            tap(() => this.getUsers()),
            takeUntil(this.destroy$)
          )
          .subscribe(() => this.successNotification('User deleted successfully'));
      }
    });
  }

  openDialog(data?: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data,
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((refresh) => {
      if (refresh) {
        this.successNotification('User added successfully');
        this.getUsers();
      }
    });
  }

  successNotification(message: string) {
    this._snackBar.open(message, '👍', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
