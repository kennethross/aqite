import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../app.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnDestroy {
  enabledSaveBtn$ = new BehaviorSubject<boolean>(false);
  userId: string;
  isCreate = false;
  loading = false;

  @ViewChild('hobbyInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;

  destroy$ = new Subject<void>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public userService: UserService,
  ) {

    console.log(data);
    this.isCreate = !data;
    if (data) {
      this.userId = data.id;
    }

    this.form = this.formBuilder.group({
      email: [
        data?.email || '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      name: [data?.name || '', Validators.required],
      hobbies: [data?.hobbies] || [],
      skillSets: [data?.skillSets] || [],
    });
  }

  addHobbies(hobby: string) {
    const values = this.form.get('hobbies')?.value || [];
    values.push(hobby);
    this.form.get('hobbies')?.setValue(values);
    this.fruitInput.nativeElement.value = '';
  }

  removeHobby(index: number) {
    const values = this.form.get('hobbies')?.value || [];
    values.splice(index, 1);
    this.form.get('hobbies')?.setValue(values);
  }

  addSkills(skill: string) {
    const values = this.form.get('skillSets')?.value || [];
    values.push(skill);
    this.form.get('skillSets')?.setValue(values);
    this.skillInput.nativeElement.value = '';
  }

  removeSkill(index: number) {
    const values = this.form.get('skillSets')?.value || [];
    values.splice(index, 1);
    this.form.get('skillSets')?.setValue(values);
  }

  saved() {
    this.form.markAllAsTouched();
    const { value } = this.form;

    const obs = this.isCreate
      ? this.userService.createUser$(value)
      : this.userService.updateUser$(this.userId, value);

    obs
      .pipe(
        tap(() => this.dialogRef.close(true)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
