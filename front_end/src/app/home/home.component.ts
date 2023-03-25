import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  uploadImage!:FormGroup
  constructor(private img: ImageService) {

  }

  ngOnInit():void {
    this.uploadImage= new FormGroup({
      image: new FormControl( '', {}),
    })
  }

  imageSubmit(e:any) {
    const apiEndpoint = ""
    this.img.submitToEndpoint()
  }

  async onChange(e:any) {
    const file = e.target.files[0]
    try {
      const base64Image = await this.img.base64(file); 
      this.img.base64Image = base64Image; this.img.file = file
    }
    catch (err) {
      console.error(err); return
    }
    
  }

  

}
