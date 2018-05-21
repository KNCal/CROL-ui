import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchComponent } from './components/search/search.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [

    {
        path: '/',
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
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}