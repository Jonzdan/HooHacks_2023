import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiEndPoint:string = ""
  private _file!: File
  private _base64Image!:any 
  constructor(private http:HttpClient) { }

  submitToEndpoint() {

  }

  base64(file:any){
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  } 

  set base64Image(str:any) { this._base64Image = str}
  set file(arg:File) { 
    if (!(arg instanceof File )) { return }
    this._file = arg
  }
}
