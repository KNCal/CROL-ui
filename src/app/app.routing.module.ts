import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchComponent } from './components/search/search.component';
import { LogoutComponent } from './components/logout/logout.component';
// import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'registration',
        pathMatch: 'full' 
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'search',
        component: SearchComponent 
    },
    {
        path: 'logout',
        component: LogoutComponent 
    },
    {
        path: 'users',
        component: UserComponent
    }
    // {
    //     path: 'add-user',
    //     component: AddUserComponent
    // }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}