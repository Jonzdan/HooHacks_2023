import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private navbar:NavbarService) {

  }
  ngOnInit():void {

  }

  get hideNavBar() { return this.navbar.hideNavBar}

  logout(e:any):void {
    this.navbar.updateNavBar()
  }

}
