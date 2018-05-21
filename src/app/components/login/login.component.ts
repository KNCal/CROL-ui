import { User } from './../../user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  logInEmail = new FormControl("", Validators.required);
  logInPassword = new FormControl("", Validators.required);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.fb.group({
      "logInEmail": this.logInEmail,
      "logInPassword": this.logInPassword
    });
  }

  onSubmit( { value, valid }: { value: FormGroup, valid: boolean }) {
    console.log(value, valid);
    console.log(this.user);
  }
}
