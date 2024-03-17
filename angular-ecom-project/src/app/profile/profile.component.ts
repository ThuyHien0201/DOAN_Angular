import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any; // Variable to store user information
  loggedInUserId: number | null = null;
  isEditing: boolean = false;
  editedName: string = '';
  editedAddress: string = '';
  editedContact: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loggedInUserId = this.userService.getLoggedInUserId();

    if (this.loggedInUserId !== null) {
      // Use loggedInUserId to fetch user information
      this.userService.getUserById(this.loggedInUserId).subscribe((userData) => {
        this.user = userData;
        // Initialize the edited fields with the user's current data
        this.editedName = this.user.name;
        this.editedAddress = this.user.address;
        this.editedContact = this.user.contact;
      });
    }
  }

  startEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    // Update the user's information
    this.user.name = this.editedName;
    this.user.address = this.editedAddress;
    this.user.contact = this.editedContact;
  
    // Send the updated user data to the server
    this.userService.updateUser(this.user).subscribe((updatedUser) => {
      // Handle the response from the server if needed
      this.isEditing = false;
    });
  }
  }
