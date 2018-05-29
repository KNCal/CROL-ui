import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

// Inject into our component
@Injectable()  
export class SearchService {



    constructor(private http: Http) {
    }
    callAPI(callStr) {
        return this.http.get(callStr);
        
    }

}