import { SearchComponent } from './../search/search.component';
import { User } from './../../user';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  private router: Router;
  users: any;
  userRetrieved: any;

  currentUser = {
    'username': '',
    'password': ''
  }

  errors = '';

  formFields = {
    'username': ' ',
    'password': ' '
  }

  user = new FormGroup({
    logInUsername: new FormControl(),
    logInPassword: new FormControl()
  })

  validationMessages = {
    'username': {
        'required': 'Name required'
    },
    'password': {
        'required': 'Password required'
    }
  }

  constructor(
    private fb: FormBuilder,
    private r: Router,
    private userService: UserService
  ) {
    this.router = r;
  }

  onChanges (data?: any) {
    if(!data) { console.log("Got Here");return; }
    const form = this.user;

    console.log("Got Here 2");

    for(const field in this.formFields) {
        // clear previous messages
      this.formFields[field] = '';
      const control = form.get(field);

      if(control) {
        if (control.dirty && !control.valid) {
          console.log('Invalid input');
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
              this.formFields[field] += messages[key] + ' ';
          }
        }  
      }
      else {
        console.log('No input ' + control);
      }
    }
  }


  validateUser(user1: FormGroup) {
    
    this.currentUser.username = user1.value.logInUsername;
    this.currentUser.password = user1.value.logInPassword;
    console.log("USER: "+JSON.stringify(this.currentUser));
    // console.log(user1.value.logInUsername);

    // console.log(this.currentUser.username );
    // var username = this.userService.getUsername(user1.value.logInUsername);
    
    this.userService.getUsername(this.currentUser)
    .subscribe( data => {
      console.log("DATA- "+JSON.stringify(data));
      this.userRetrieved = data;
      },
      error => {
        this.errors = error;
      },
      () => {

        this.router.navigate(['/search', this.userRetrieved.id]);
      }
    );

  
  }
  

  onSubmit(user: FormGroup, event: Event) {
    event.preventDefault();
    user.valueChanges.subscribe(data => this.onChanges(data));
    console.log(this.user.value.logInUsername);
    console.log(user.status);
    // validate user
    this.validateUser(user);
    this.router.navigate(['/search']);
  }

  ngOnInit() {
    this.user = this.fb.group({
      logInUsername: [ '', Validators.required ],
      logInPassword: [ '', Validators.required ]
    });
  };

}





