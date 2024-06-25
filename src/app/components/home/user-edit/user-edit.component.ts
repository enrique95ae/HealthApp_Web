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
    const userId = this.data.Id;
    const updateData = {
      Name: this.data.Name,
      DoB: this.data.DoB,
      Weight: this.data.Weight,
      Height: this.data.Height,
      BodyType: this.data.BodyType,
      Goal: this.data.Goal,
      Username: this.data.Username,
      Gender: this.data.Gender,
      Id: this.data.Id
    };
    
    this.userService.updateUser(userId, updateData).subscribe(
      updatedUser => {
        this.dialogRef.close(updatedUser);  // Pass back the updated data
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
