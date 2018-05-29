import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; //don't make a request but wait a second.  PReventing from getting but every second.
import { distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms'
// import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

user: FormGroup;

// y: any;

fields = [ 
      { name: 'Board Meeting', tag: 'Board Meeting', selected: false, id: 1 },
      { name: 'Housing Authority', tag: 'Housing Authority', selected: false, id: 2 },
      { name: 'Housing Preservation & Development', tag: 'HOUSING PRESERVATION & DVLPMNT', selected: false, id: 3 },
      { name: 'Parks & Recreation Department', tag: 'DEPT OF PARKS & RECREATION', selected: false, id: 4 },
      { name: 'Design & Construction', tag: 'Design and Construction', selected: false, id: 5 },
      { name: 'Procurement', tag: 'Procurement', selected: false, id: 6 },
      { name: 'Construction/Construction Services', tag: 'Construction/Construction Services', selected: false, id: 7 },
      { name: 'Award', tag: 'Award', selected: false, id: 8 },
      { name: 'Intent to Award', tag: 'Intent to Award', selected: false, id: 9 },
      { name: 'Solicitation', tag: 'Solicitation', selected: false, id: 10 },
      { name: 'Request for Proposals', tag: 'Request for Proposals', selected: false, id: 11 },
      { name: 'Competitive Sealed Bids', tag: 'Competitive Sealed Bids', selected: false, id: 12 },
      { name: 'Competitive Sealed Proposals', tag: 'Competitive Sealed Proposals', selected: false, id: 13 },
      { name: 'Negotiated Acquisition', tag: 'Negotiated Acquisition', selected: false, id: 14 },
      { name: 'Demonstration Project', tag: 'Demonstration Project', selected: false, id: 15 }
    ];

  filterResults:  any;
  // searchSubject = new Subject(); 

  constructor(
    // private http: Http,
    // private searchService: SearchService,
    private fb: FormBuilder,
    private searchService: SearchService
    ) 
    { 
      // this.createForm()
    }  

  createForm() {
    this.user = this.fb.group({
      fields: this.setFields()
    });
  }
  
  setFields() {
    const fieldsArray = this.fields.map(field => {
      return this.fb.control(field.selected);
    });
    return this.fb.array(fieldsArray);
  }

  prefix: string;
  queryStr: string;


  buildQueryAPI(typeCount, type) {
    // this.prefix = 'https://data.cityofnewyork.us/resource/buex-bi6w.json?$where=agency_name in (\'';
    this.prefix = 'https://data.cityofnewyork.us/resource/buex-bi6w.json?$where=' + type + ' in (\'';
    this.queryStr = '';

    if (typeCount.length > 0) {
      for (let i of typeCount) {
        this.queryStr += this.fields[i]['tag'];
        this.queryStr += '\',\'';
      }
      this.queryStr = this.queryStr.slice(0, -2);
      this.queryStr = encodeURIComponent(this.queryStr);
      this.queryStr += ')';
      this.queryStr = this.prefix + this.queryStr;
      console.log(this.queryStr); 
      return this.queryStr;
    }
  }


  onSubmit(user1: FormGroup, event: Event) {
    event.preventDefault(); 

    //Get index of the values that are true
    var x = user1.value.fields.map((y,index) => {if (y) return index;});
  
    //Filter out undefined
    const filtered: string[] = x.filter(element => element !== undefined);


    const agencyCount: string[] = filtered.filter(y => y < "5");
    const sectionCount: string[] = filtered.filter(y => "4" < y && y < "6");
    const categoryCount: string[] = filtered.filter(y => "5" < y && y < "7");
    const typeDescriptionCount: string[] = filtered.filter(y => "6" < y && y < "9");
    const selectionMethodCount: string[] = filtered.filter(y => y > "8");

    //Agency_name query
    var agencyQuery = this.buildQueryAPI(agencyCount, 'agency_name');
    var sectionQuery = this.buildQueryAPI(sectionCount, 'section_name');
    var categoryQuery = this.buildQueryAPI(categoryCount, 'category_description');
    var typeDescriptionQuery = this.buildQueryAPI(typeDescriptionCount, 'type_of_notice_description');
    var selectionMethodQuery = this.buildQueryAPI(selectionMethodCount, 'selection_method_description');    


  }

  

  ngOnInit() {

    this.createForm()

    //count of number of items in each catefory
    var fieldsAgencyCount = this.fields.filter(field => field.tag.indexOf("agency_name") > -1);
    var fieldsSectionCount = this.fields.filter(field => field.tag.indexOf("section_name") > -1);
    var fieldsCategoryCount = this.fields.filter(field => field.tag.indexOf("category_description") > -1);
    var fieldsTypeNoticeDescCount = this.fields.filter(field => field.tag.indexOf("type_of_notice_description") > -1);
    var fieldsSelectionMethodDescCount = this.fields.filter(field => field.tag.indexOf("selection_method_description") > -1)

  }
}
