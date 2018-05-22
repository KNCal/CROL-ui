import { SearchComponent } from './../search/search.component';
import { User } from './../../user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  logInEmail = new FormControl("", Validators.required);
  logInPassword = new FormControl("", Validators.required);
  private router: Router;

  constructor(
    private fb: FormBuilder,
    private r: Router
  ) {
    this.router = r;
  }

  ngOnInit() {
    this.user = this.fb.group({
      "logInEmail": this.logInEmail,
      "logInPassword": this.logInPassword
    });
  }

  // onSubmit({ value, valid }: { value: FormGroup, valid: boolean }) {
  //   console.log(value, valid);
  //   console.log(this.user);

    //Check for authentication here then route to next page. 
    //For this example, we'll skip authentication.

    // this.router.navigateByUrl(‘/portal');
    // this.router.navigate(['/search']);

  onSubmit(user: any, event: Event) {
    event.preventDefault();

  }
  save() {
    this.router.navigateByUrl('/search');
  }  
  // public preventDefault(event: Event): void {
  //   event.preventDefault();
  // }
}





