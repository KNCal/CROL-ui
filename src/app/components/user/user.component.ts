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
  user = 
    { "email": "",
    "password": "",
    "filters": ""
    };

  userEdit = 
    { "email": "",
    "password": "",
    "filters": ""
    };
    
  constructor(private userService: UserService) {
  }

  addUser(user){
    this.userService.addUser(this.user)
        .subscribe( data => {
          console.log(data);
        });
  };
  
  editUser(userEdit){
    this.userService.editUser(
      this.userEdit).
      subscribe(data=>console.log(data))
  }

  getUsers() {
    this.userService.getAllUsers()
      .subscribe( data => {
        this.users = data.json();
        console.log(data);
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
