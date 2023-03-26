import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  uploadImage!:FormGroup
  confirmImage!:FormGroup
  @ViewChildren('form') fields!: QueryList<any | any[]>

  constructor(private img: ImageService, private elementRef:ElementRef) {

  }

  ngOnInit():void {
    this.uploadImage= new FormGroup({
      image: new FormControl( '', {}),
    })
    this.confirmImage = new FormGroup({})
  }

  imageSubmit(e:any) {
    this.img.submitToEndpoint()
  }

  confirmDetails(e:any) {
    const obj = structuredClone(this.confirmData)
    obj['records'] = {}
    let firstOrNot = false
    if (this.fields.first.nativeElement.children.length-3 !== Object.keys(this.confirmData).length) {
      return 
    }
    for (const htmlElem of this.fields.first.nativeElement.children) {
      if (htmlElem.nodeName !== 'DIV') break
      let name = htmlElem.firstElementChild.textContent.slice(0, (htmlElem.firstElementChild.textContent as string).length - 1)
      if (!firstOrNot) {
        name = htmlElem.firstElementChild.textContent
      }
      let value = htmlElem.lastElementChild.textContent.slice(1)
      if (firstOrNot) { obj.records[name] = Number(value) }
      if (!firstOrNot) firstOrNot = true
    }
    this.img.finalSubmitToEndPoint(obj)
    this.resetFile('')
  }

  async onChange(e:any) {
    const file = e.target.files[0]
    try {
      let base64Image = await this.img.base64(file); 
      const index = (base64Image as string).indexOf("base64,") + 7
      base64Image = (base64Image as string).slice(index)
      this.img.base64Image = base64Image; this.img.file = file
    }
    catch (err) {
      console.error(err); return
    }
    
  }

  closePopUp(e:any) {
    this.img.confirmPopUp = false
  }

  resetFile(e:any) {
    this.elementRef.nativeElement.querySelector("#image").value = ""
    this.img.resetFiles()
  }

  closeFinishedPopUp(e:any) {
    this.img.finishedPopUp = false;
  }

  get confirmPopUp() { return this.img.confirmPopUp }
  get loading() { return this.img.loading }
  get confirmData() { return this.img.confirmData }
  get finishedPopUp() { return this.img.finishedPopUp}

  

}
