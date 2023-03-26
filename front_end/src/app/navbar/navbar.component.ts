import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
import { NavbarService } from '../navbar.service';
import { RecieptService } from '../reciept.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @HostListener('window:resize', []) 
  updateMenu() {
    this.navbar.updateNavBarToIcon(window.innerWidth)
  }

  constructor(private navbar:NavbarService, private router:Router, private receipt:RecieptService) {

  }
  ngOnInit():void {
    this.navbar.updateNavBarToIcon(window.innerWidth)
    this.router.events.pipe(
      map((event:any)=> {
        if (!(event instanceof NavigationEnd)) return
        switch (event.url) {
          case "/home": {
            this.navbar.updateNavigatedAway()
            this.receipt.resetData()
            break
          }
          case "/history": {
            this.navbar.updateNavigatedAway()
            this.receipt.resetData()
            break
          }
          case "/spendingTracker": {
            this.navbar.updateNavigatedAway()
            this.receipt.resetData()
            break
          }
        }
      })
    ).subscribe(res => {})
  }

  openSideBar(e:any) {
    this.navbar.flipSideBar(e)
  }

  get hideNavBar() { return this.navbar.hideNavBar}
  get navBarToIcon() { return this.navbar.navBarToIcon}
  get showIconMenu() { return this.navbar.showIconMenu}

  logout(e:any):void {
    this.navbar.updateNavBar()
  }

}
