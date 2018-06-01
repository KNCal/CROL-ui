import { fields } from './../../fields';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; 
import { distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: FormGroup;
  userID: any;
  prefix: string;
  queryStr: string;
  strSeparated = '';

  fields = fields;
  currentUser;

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
      private searchService: SearchService,
      private userService: UserService,
      private route: ActivatedRoute
    ) 
    { 
        this.createForm();   
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
      //Build query string and use Subject to make get request to API
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

          //get only service that is passed in
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
      }}
  }

  saveFilters(user1: FormGroup) {
    console.log(this.currentUser["username"]);
    var filterString = user1.value.fields.map(y => y? "1":"0").toString().replace(/,/g , "");
    console.log(filterString);
    this.currentUser.filters = filterString;
    this.userService.editUser(this.currentUser.id,
      this.currentUser)
      .subscribe(data=>console.log(data))
  }

  onSubmit(user1: FormGroup, event: Event) {
      event.preventDefault(); 

      //Form returns value and status.  Processing from value of array of booleans.
      //Get index of the values that are true
      var x = user1.value.fields.map((y,index) => {if (y) return index;});
    
      //Filter out undefined
      const filtered: string[] = x.filter(element => element !== undefined);

      //Countinng number of selected checkboxex in each cateogry to form query.  At the moment, buildQeuryAPI is using "where..in"
      //SoQL syntax. Hard coded total number of elements in each category here.  Need to dynamically do this.  Create an interface to 
      //the fields table and do count processing.  Fields table stored in fields.ts
      const agencyCount: string[] = filtered.filter(y => y < "5");
      const sectionCount: string[] = filtered.filter(y => "4" < y && y < "6");
      const categoryCount: string[] = filtered.filter(y => "5" < y && y < "7");
      const typeDescCount: string[] = filtered.filter(y => "6" < y && y < "10");
      const selMethCount: string[] = filtered.filter(y => y > "9");

      //Call BuildQueryAPI on each category passing the number of selected checkboxes in that category and category name
      this.buildQueryAPI(agencyCount, 'agency_name');
      this.buildQueryAPI(sectionCount, 'section_name');
      this.buildQueryAPI(categoryCount, 'category_description');
      this.buildQueryAPI(typeDescCount, 'type_of_notice_description');
      this.buildQueryAPI(selMethCount, 'selection_method_description');  
  }
  

  initiateSearchService() :void {
        //Call search service to listen in each select category
      this.searchSubjectAgency
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(aQ=>
          this.searchService.callAPI(aQ)
          .subscribe(response => {        
            this.queryStreamAgency = response}));

      this.searchSubjectSection
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(sQ=>
          this.searchService.callAPI(sQ)
          .subscribe(response => this.queryStreamSection = response));

      this.searchSubjectCategory
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(cQ=>
          this.searchService.callAPI(cQ)
          .subscribe(response => this.queryStreamCategory = response));    

      this.searchSubjectTypeDesc
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(tDQ=>
          this.searchService.callAPI(tDQ)
          .subscribe(response => this.queryStreamTypeDesc = response));  

      this.searchSubjectSelMeth
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(sMQ=>
          this.searchService.callAPI(sMQ)
          .subscribe(response => this.queryStreamSelMeth = response));
  }


  findRouteID() :void {
      this.route.params
      .subscribe(param => {
          console.log(this.route.data);
          this.userID = param.id;
          console.log(this.userID);
      });
  }


  getUserData() :void {
      this.userService.getUserByID(this.userID.toString())
      .subscribe( data => {
          this.currentUser = data;
          console.log(this.currentUser["filters"]);
          var arrSeparated = this.currentUser["filters"].split("");
          console.log(arrSeparated);
          var booleanArr = arrSeparated.map(y => y=="1"? true:false)
          console.log(booleanArr);
          this.user.controls['fields'].setValue(booleanArr);
          console.log(this.user.value.fields);
          console.log(this.currentUser["username"]);
      });
  }


  ngOnInit() {
      this.findRouteID();
      this.getUserData();
      this.initiateSearchService();
  }

}
