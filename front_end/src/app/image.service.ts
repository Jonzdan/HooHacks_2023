import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiEndPoint:string = "/uploadImage"
  private cApiEndPoint:string = "/confirmImage"
  private _file!: File
  private _base64Image!:any 
  private _confirmData:any = {}
  private _confirmPopup:boolean = false
  private _loading:boolean = false;
  private _finishedPopUp:boolean = false;
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
    const obj = {'image':this._base64Image, 'image_name':this._file.name}
    this.http.post(this.apiEndPoint, obj, {

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
    if (!this.checkFields(obj)) { alert('Receipt unable to be processed');return}
    this._confirmData = obj
    this.http.post(this.cApiEndPoint, this._confirmData, {

    }).subscribe((res) => {
      this._confirmPopup = false
      this._finishedPopUp = true;

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
      if (fields === "status" && this._confirmData[fields] === 'False') return false
      
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

  
  get finishedPopUp() { return this._finishedPopUp }
  get loading() { return this._loading}
  get confirmData() { return this._confirmData}
  get confirmPopUp() { return this._confirmPopup }
  set confirmPopUp(e:boolean) { this._confirmPopup = e }
  set finishedPopUp(e:boolean) { this._finishedPopUp = e; }
  set base64Image(str:any) { this._base64Image = str}
  set file(arg:File) { 
    if (!(arg instanceof File )) { return }
    this._file = arg
  }
}
