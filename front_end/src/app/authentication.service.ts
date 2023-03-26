import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenicationService {

  private _signedIn:boolean = false;
  constructor() { }
  
  get signedIn() { return this._signedIn }
}
