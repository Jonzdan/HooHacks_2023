import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenicationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  inputForm!:FormGroup
  constructor(private authenticate:AuthenicationService, private router:Router) {

  }
  ngOnInit():void {
    this.inputForm= new FormGroup({
      user: new FormControl( '', {}),
      passOne: new FormControl('',{}),
      passTwo: new FormControl('',{})
    })
  }

  onSubmit(e:any) {
    console.log("submit attempt")
  }
}
