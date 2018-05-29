import { SearchService } from './components/search/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { ViewComponent } from './components//view/view.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';

// import { AddUserComponent } from './components/add-user/add-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    ViewComponent,
    SignupComponent,
    RegistrationComponent,
    LogoutComponent,
    UserComponent
    // AddUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    SearchService
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
