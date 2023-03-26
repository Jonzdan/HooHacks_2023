import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private _hideNavBar:boolean = false;

  constructor() { }

  updateNavBar():void {
    this._hideNavBar = !this._hideNavBar
  }

  get hideNavBar() { return this._hideNavBar }
}
