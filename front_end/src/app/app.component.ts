import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front_end';
  constructor(private navbar: NavbarService, private router:Router) {

  }

  ngOnInit():void {
  
  }

  get showIconMenu() { return this.navbar.showIconMenu }
}
