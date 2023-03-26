import { Component, QueryList, ViewChildren } from '@angular/core';
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

  constructor(private img: ImageService) {

  }

  ngOnInit():void {
    this.uploadImage= new FormGroup({
      image: new FormControl( '', {}),
    })
    this.confirmImage = new FormGroup({})
  }

  imageSubmit(e:any) {
    console.log(123)
    this.img.submitToEndpoint()
  }

  confirmDetails(e:any) {
    const obj = structuredClone(this.confirmData)
    console.log(this.confirmData)
    let firstOrNot = false
    for (const htmlElem of this.fields.first.nativeElement.children) {
      if (htmlElem.nodeName !== 'DIV') break
      let name = htmlElem.firstElementChild.textContent.slice(0, (htmlElem.firstElementChild.textContent as string).length - 1)
      if (!firstOrNot) {
        name = htmlElem.firstElementChild.textContent
      }
      let value = htmlElem.lastElementChild.textContent.slice(1)
      if ((this.confirmData.records === undefined || this.confirmData.records[name] === undefined) && firstOrNot) { return }
      if (firstOrNot) { obj.records[name] = Number(value) }
      if (!firstOrNot) firstOrNot = true
    }
    this.img.finalSubmitToEndPoint(obj)
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

  closeFinishedPopUp(e:any) {
    this.img.finishedPopUp = false;
  }

  get confirmPopUp() { return this.img.confirmPopUp }
  get loading() { return this.img.loading }
  get confirmData() { return this.img.confirmData }
  get finishedPopUp() { return this.img.finishedPopUp}

  

}
