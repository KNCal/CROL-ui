import { SearchComponent } from './../search/search.component';
import { User } from './../../user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // user = new FormGroup ({
  //   logInEmail: new FormControl(),
  //   logInPassword: new FormControl()
  // });

  private router: Router;
  users: any;

  formFields = {
    'email': ' ',
    'password': ' '
  }

  user = new FormGroup({
    logInEmail: new FormControl(),
    logInPassword: new FormControl()
  })

  validationMessages = {
    'email': {
        'required': 'Name is required'
    },
    'password': {
        'required': 'Name is required'
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

      // if(control && control.dirty && !control.valid) {
      //   console.log('Invalid input');
      //   const messages = this.validationMessages[field];
      //   for(const key in control.errors) {
      //       this.formFields[field] += messages[key] + ' ';
      //   }
      // }

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


  //Check for authentication then route to next page. 
  //For this example, we'll skip authentication.
  validateUser(user1) {
    this.userService.getUser(user1)
        .subscribe( data => {
          this.users = data.json();
          console.log(data);
    });

    //if succeed:
    this.router.navigate(['/search']);
  }

  

  onSubmit(user: FormGroup, event: Event) {
    event.preventDefault();
    this.user.valueChanges.subscribe(data => this.onChanges(data));
    console.log(this.user.value);
    console.log(this.user.status);
    // validate user
    this.validateUser(user);
    this.router.navigate(['/search']);
  }

  ngOnInit() {
    this.user = this.fb.group({
      logInEmail: [ '', Validators.required ],
      logInPassword: [ '', Validators.required ]
    });
  };

}





