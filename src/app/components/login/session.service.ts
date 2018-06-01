import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

// Inject into our component
@Injectable()  
export class InfoService {

    constructor(private http: Http) {

    }
    // createAPI(turret) {
    //     return this.http.get('http://localhost:3000/api/turret/' + turret);   
    
}