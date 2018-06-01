import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

// Inject into our component
@Injectable()  
export class SearchService {



    constructor(private http: HttpClient) {
    }
    callAPI(callStr) {
        return this.http.get(callStr);
        
    }

}