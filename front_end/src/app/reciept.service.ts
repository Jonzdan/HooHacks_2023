import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class RecieptService {

  
  private _data?:any 
  private _loaded:boolean = false
  apiEndPoint:string = '/getData'
  constructor(private http: HttpClient, private navbar:NavbarService) { }

  pullData(str:string) {
    this.http.post(this.apiEndPoint, {'range':str}, {

    }).pipe(
      tap((e)=> {
        console.log(e)
      })
    ).subscribe((res)=> {
      this._data = res
      this._loaded = true;
    })
  }

  resetData():void {
    this._data = undefined
    this._loaded = false
  }

  get data() { return this._data}
  get loaded() { return this._loaded}

}
