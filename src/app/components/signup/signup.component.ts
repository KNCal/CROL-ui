import { UserService } from './../../user.service';
import { User } from './../../user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: FormGroup;
  signUpEmail = new FormControl("", Validators.required);
  signUpPassword = new FormControl("", Validators.required);
  signUpConfirmedPassword = new FormControl("", Validators.required);

  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.user = this.fb.group({
      "signUpEmail": this.signUpEmail,
      "signUpPassword": this.signUpPassword,
      "signUpConfirmedPassword": this.signUpConfirmedPassword
    });
  }

  onSubmit( { value, valid }: { value: FormGroup, valid: boolean }) {
    console.log(value, valid);
    console.log(this.user);  

    
  }
}
