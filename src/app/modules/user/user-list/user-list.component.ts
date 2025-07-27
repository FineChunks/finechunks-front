import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../dto/user.dto';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    this.userService.getAll().subscribe({
      next: data => {
        this.users = data;
        this.isLoading = false;
      },
      error: err => {
        console.error('Failed to fetch users:', err);
        this.error = 'Failed to load users. Please try again later.';
        this.isLoading = false;
        this.snackBar.open('Failed to load users.', 'Close', { duration: 3000 });
      },
    });
  }

  createNewUser(): void {
    this.router.navigate(['/users/new']);
  }

  editUser(id: string): void {
    this.router.navigate([`/users/edit/${id}`]);
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
          this.loadUsers(); // Reload the list after deletion
        },
        error: err => {
          console.error('Failed to delete user:', err);
          this.snackBar.open('Failed to delete user.', 'Close', { duration: 3000 });
        },
      });
    }
  }
}
