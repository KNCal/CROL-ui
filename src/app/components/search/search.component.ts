import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; 
import { distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { fields } from '../../fields';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  fields = fields;
  user: FormGroup;
  prefix: string;
  queryStr: string;

  searchSubjectAgency = new Subject();
  searchSubjectSection = new Subject();
  searchSubjectCategory= new Subject();
  searchSubjectTypeDesc = new Subject();
  searchSubjectSelMeth = new Subject();

  queryStreamAgency: any;
  queryStreamSection: any;
  queryStreamCategory: any;
  queryStreamTypeDesc: any;
  queryStreamSelMeth: any;



  constructor(
    private fb: FormBuilder,
    private searchService: SearchService
    ) 
    { 
      this.createForm()
    }  

  createForm() {
    this.user = this.fb.group({
      fields: this.setFields()
    });
  }
  
  setFields() {
    const fieldsArray = fields.map(field => {
      return this.fb.control(field.selected);
    });
    return this.fb.array(fieldsArray);
  }


  buildQueryAPI (typeCount, type) {
    this.prefix = 'https://data.cityofnewyork.us/resource/buex-bi6w.json?$where=' + type + ' in (\'';
    this.queryStr = '';

    if (typeCount.length > 0) {
        for (let i of typeCount) {
            this.queryStr += fields[i]['tag'];
            this.queryStr += '\',\'';
        }
        this.queryStr = this.queryStr.slice(0, -2);
        this.queryStr = encodeURIComponent(this.queryStr);
        this.queryStr += ')';
        this.queryStr = this.prefix + this.queryStr;

        //next only on the service that has been subscribed
        switch (type) {
          case 'agency_name' : this.searchSubjectAgency.next(this.queryStr);
            break;
          case 'section_name' : this.searchSubjectSection.next(this.queryStr);
            break;
          case 'category_description' : this.searchSubjectCategory.next(this.queryStr);
            break;
          case 'type_of_notice_description' : this.searchSubjectTypeDesc.next(this.queryStr);
            break; 
          case 'selection_method_description' : this.searchSubjectSelMeth.next(this.queryStr);
            break;
          default:
            break;      
    }}};
  

  onSubmit(user1: FormGroup, event: Event) {
    event.preventDefault(); 

    //Get index of the values that are true
    var x = user1.value.fields.map((y,index) => {if (y) return index;});
  
    //Filter out undefined
    const filtered: string[] = x.filter(element => element !== undefined);

    const agencyCount: string[] = filtered.filter(y => y < "5");
    const sectionCount: string[] = filtered.filter(y => "4" < y && y < "6");
    const categoryCount: string[] = filtered.filter(y => "5" < y && y < "7");
    const typeDescCount: string[] = filtered.filter(y => "6" < y && y < "10");
    const selMethCount: string[] = filtered.filter(y => y > "9");

    this.buildQueryAPI(agencyCount, 'agency_name');
    this.buildQueryAPI(sectionCount, 'section_name');
    this.buildQueryAPI(categoryCount, 'category_description');
    this.buildQueryAPI(typeDescCount, 'type_of_notice_description');
    this.buildQueryAPI(selMethCount, 'selection_method_description');  
  }
  

  ngOnInit() {
    // this.createForm();
    this.searchSubjectAgency
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .subscribe(aQ=>
        this.searchService.callAPI(aQ)
        .subscribe(response => {        
          this.queryStreamAgency = response.json()}));

    this.searchSubjectSection
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .subscribe(sQ=>
        this.searchService.callAPI(sQ)
        .subscribe(response => this.queryStreamSection = response.json()));

    this.searchSubjectCategory
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .subscribe(cQ=>
        this.searchService.callAPI(cQ)
        .subscribe(response => this.queryStreamCategory = response.json()));    

    this.searchSubjectTypeDesc
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .subscribe(tDQ=>
        this.searchService.callAPI(tDQ)
        .subscribe(response => this.queryStreamTypeDesc = response.json()));  

    this.searchSubjectSelMeth
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .subscribe(sMQ=>
        this.searchService.callAPI(sMQ)
        .subscribe(response => this.queryStreamSelMeth = response.json()));  

  }
}
