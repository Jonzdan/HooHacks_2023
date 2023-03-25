import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenicationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  inputForm!:FormGroup
  constructor(private authenticate:AuthenicationService, private router:Router) {

  }
  ngOnInit():void {
    this.inputForm= new FormGroup({
      user: new FormControl( '', {}),
      pass: new FormControl('',{}),
    })
  }

  onSubmit(e:any) {
    console.log("submit attempt")
  }
}
