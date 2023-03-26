import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private _hideNavBar:boolean = false;
  private _navBarToIcon:boolean = false;
  private _showIconMenu: boolean = false;
  public _receiptNavigatedAway:boolean = false;

  constructor() { }

  updateNavBar():void {
    this._hideNavBar = !this._hideNavBar
  }
  updateNavBarToIcon(width:number):void {
    if (typeof(width) !== 'number') return
    if (width <= 450) { 
      this._navBarToIcon = true
    }
    else {
      this._navBarToIcon = false
    }
    
  }

  updateNavigatedAway() {
    this._receiptNavigatedAway = !this._receiptNavigatedAway
  }

  flipSideBar(e:any) {
    this._showIconMenu = !this._showIconMenu
  }

  get receiptNavigatedAway() { return this._receiptNavigatedAway}
  get showIconMenu() { return this._showIconMenu}
  get hideNavBar() { return this._hideNavBar }
  get navBarToIcon() { return this._navBarToIcon }
}
