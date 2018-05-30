import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {


  constructor(
    private r: Router
  ) {
    this.r = r;
  }

  ngOnInit() {
  }
      
  logout() {
    this.r.navigate(['/']);
  }  

}
