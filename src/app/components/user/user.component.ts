import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private users: any;

  
  user = { 
    "username": "",
    "password": "",
    "filters": ""
  };

  userEdit = { 
    "username": "",
    "password": "",
    "filters": ""
  };

  userId;
    
  constructor(private userService: UserService) {
  }

  getUsername(user) {
    this.userService.getUsername(user)
        .subscribe( data => {
          console.log(data);
        });
  };

  getUserByID(id) {
    this.userService.getUserByID(id)
    .subscribe( data => {
      console.log(data);
    });
  }

  addUser(){
    this.userService.addUser(this.user)
        .subscribe( data => {
          console.log(data);
        });
  };
  
  editUser(){
    this.userService.getUsername(this.userEdit).subscribe(data => this.userId = data['id']);
    this.userService.editUser(this.userId,
      this.userEdit).
      subscribe(data=>console.log(data))
  }

  getUsers() {
    this.userService.getAllUsers()
      .subscribe( data => {
        this.users = data;
        //console.log(data);
    });
  };

  deleteUser(user: User) {
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  }

  ngOnInit() {

  }
}
