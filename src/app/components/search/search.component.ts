import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; //don't make a request but wait a second.  PReventing from getting but every second.
import { distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form: FormGroup;
  filterResults:  any;
  searchSubject = new Subject(); //add this property
  // submitted = false;
  private fString: String;

  constructor(
    private http: Http,
    private searchService: SearchService,
    builder: FormBuilder
    ) 
    { 
      this.form = builder.group({
        agency_name_1: '',
        agency_name_2: '',
        agency_name_3: '',
        agency_name_4: '',
        agency_name_5: '',
        section_name_1: '',
        section_name_2: '',
        category_description_1: '',
        type_of_notice_description_1: '',
        type_of_notice_description_2: '',
        type_of_notice_description_3: '',
        selection_method_description_1: '',
        selection_method_description_2: '',
        selection_method_description_3: '',
        selection_method_description_4: '',
        selection_method_description_5: ''
      })
    }  

  ngOnInit() {
    this.searchSubject
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .subscribe(filterString=>
        this.searchService.createAPI(filterString)
        .subscribe(response => this.filterResults = response.json()))
  }

  onSubmit() {
    //Hard code for now.  Need to read this in from input     
    this.fString = '1111111111111111';
    this.searchSubject.next(this.fString);
  }
  
//   searchResutls(fString){
//     this.searchSubject.next(fString);
//   }
}
