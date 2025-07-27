import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatSnackBarModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  @Input() userId: string | null = null;
  isEditMode = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), this.isEditMode ? Validators.nullValidator : Validators.required]], // Password optional in edit mode
    });

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.isEditMode = true;
        this.userService.getById(this.userId).subscribe({
          next: user => {
            this.userForm.patchValue(user);
            // Remove password validation for existing users if not changing password
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
          },
          error: err => {
            console.error('Failed to load user for edit:', err);
            this.snackBar.open('Failed to load user for editing.', 'Close', { duration: 3000 });
            this.router.navigate(['/users']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: { username: string; email: string; password?: string } = this.userForm.value;
      if (this.isEditMode && this.userId) {
        if (user.password === '') {
          user.password = undefined;
        }

        this.userService.update(this.userId, user).subscribe({
          next: () => {
            this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/users']);
          },
          error: err => {
            console.error('Failed to update user:', err);
            this.snackBar.open('Failed to update user.', 'Close', { duration: 3000 });
          },
        });
      } else {
        this.userService.create(user).subscribe({
          next: () => {
            this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/users']);
          },
          error: err => {
            console.error('Failed to create user:', err);
            this.snackBar.open('Failed to create user.', 'Close', { duration: 3000 });
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
