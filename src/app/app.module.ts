import { SearchService } from './components/search/search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { NotesComponent } from './notes/notes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    SignupComponent,
    RegistrationComponent,
    LogoutComponent,
    UserComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
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
