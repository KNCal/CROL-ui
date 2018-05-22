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

  newUser: FormGroup;
  signUpEmail = new FormControl("", Validators.required);
  signUpPassword = new FormControl("", Validators.required);
  signUpConfirmedPassword = new FormControl("", Validators.required);
  private router: Router;

  constructor(
    private fb: FormBuilder,
    private r: Router
  ) {
    this.router = r;
  }
  
  ngOnInit() {
    this.newUser = this.fb.group({
      "signUpEmail": this.signUpEmail,
      "signUpPassword": this.signUpPassword,
      "signUpConfirmedPassword": this.signUpConfirmedPassword
    });
  }

  onSubmit( { value, valid }: { value: FormGroup, valid: boolean }) {
    console.log(value, valid);
    console.log(this.newUser);  
    this.router.navigateByUrl('/search');
    //adduser

  }

  public preventDefault(event: Event): void {
    event.preventDefault();
  }
  
}
