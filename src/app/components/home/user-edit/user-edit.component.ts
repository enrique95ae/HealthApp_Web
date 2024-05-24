import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../models/user.model';  // Adjust the path as needed
import { UsersService } from '../../../services/users/users.service';  // Adjust the path as needed

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UsersService
  ) {}

  onSave(): void {
    this.userService.updateUser(this.data).subscribe(
      updatedUser => {
        this.dialogRef.close(updatedUser);  // Pass back the updated data
      },
      error => {
        console.error('Error updating user:', error);
        // Optionally show an error message to the user
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
