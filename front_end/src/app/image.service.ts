import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiEndPoint:string = ""
  private _file!: File
  private _base64Image!:any 
  private _confirmData:any = {}
  private _confirmPopup:boolean = false
  private _loading:boolean = false;
  constructor(private http:HttpClient) { }

  submitToEndpoint() {
    //console.log(this._base64Image)
    /* this._confirmData = {
      "file_name": "test.jpeg",
      "records": {
          "FACIAL ": 45.0,
          "TOTAL": 16.8,
          "TOTAL TAX": 1.8
      },
      "status": "True"
    } */
    this._confirmPopup = true
    this.http.post(this.apiEndPoint, this._base64Image, {

    }).pipe(
      tap((e) => {
        this._loading = true;
      })
    ).subscribe((res)=> {
      this._confirmData = res
      this._confirmPopup = true;
    })
  }

  finalSubmitToEndPoint(obj:Object) {
    if (!(obj instanceof Object)) return
    if (!this.checkFields(obj)) return
    this._confirmData = obj
    this.http.post(this.apiEndPoint, this._confirmData, {

    }).subscribe((res) => {

    })
  }

  checkFields(obj:any):boolean {
    for (const fields of Object.keys(obj)) {
      /* if (fields === "records") {
        for (const names of Object.keys(obj[fields])) {
          if (this._confirmData[fields][names] === undefined) return false
        }
      }
      else { */
      if (this._confirmData[fields] === undefined) return false
      
    }
    return true
  }

  base64(file:any){
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  } 

  

  get loading() { return this._loading}
  get confirmData() { return this._confirmData}
  get confirmPopUp() { return this._confirmPopup }
  set confirmPopUp(e:boolean) { console.log(this._confirmPopup); this._confirmPopup = e }
  set base64Image(str:any) { this._base64Image = str}
  set file(arg:File) { 
    if (!(arg instanceof File )) { return }
    this._file = arg
  }
}
