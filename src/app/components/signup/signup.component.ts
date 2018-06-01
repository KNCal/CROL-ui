import { UserService } from './../../user.service';
import { User } from './../../user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private router: Router;
  users: any;

  formFields = {
    'username': '',
    'password': '',
    'confirmPassword': ''
  }

  newUser = new FormGroup({
    signUpUsername: new FormControl(),
    signUpPassword: new FormControl(),
    signUpConfirmPassword: new FormControl()
  })
 
  validationMessages = {
    'username': {
        'required': 'Username is required'
    },
    'password': {
        'required': 'Password is required'
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
    const form = this.newUser;

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

  onSubmit(newUser: FormGroup, event: Event) {
    event.preventDefault();
    this.newUser.valueChanges.subscribe(data => this.onChanges(data));
    console.log(this.newUser);
    //add user
    this.userService.addUser(this.newUser)
          .subscribe( data => {
            console.log(data);
    });
    this.router.navigateByUrl('/search');
  }

  ngOnInit() {
    this.newUser = this.fb.group({
      signUpUsername: [ '', Validators.required ],
      signUpPassword: [ '', Validators.required ],
      signUpConfirmedPassword: [ '', Validators.required ]
    });
  }


}
