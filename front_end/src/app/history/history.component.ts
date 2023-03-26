import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { NavbarService } from '../navbar.service';
import { RecieptService } from '../reciept.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  typeOfSelector:string = "Report"
  categories!:FormGroup

  constructor(private receipt:RecieptService, private navbar:NavbarService, private router:Router) {

  }

  ngOnInit():void {
    this.categories = new FormGroup({
      selector: new FormControl('', {}),
      reportCat: new FormControl('', {}),
      dateCat: new FormControl('', {}),
      searchCat: new FormControl('', {}),
      sort: new FormControl('', {}),
      sortBy: new FormControl('', {})
    })

    this.router.events.pipe(
      map((event:any)=> {
        if (!(event instanceof NavigationEnd)) return
        switch (event.url) {
          case "/home": {
            this.navbar.updateNavigatedAway()
            break
          }
          case "/history": {
            this.navbar.updateNavigatedAway()
            break
          }
          case "/spending_tracker": {
            this.navbar.updateNavigatedAway()
            break
          }
        }
      })
    )
  }

  onChange(e:any) {
    switch (e.target.value) {
      case "search": {
        this.typeOfSelector = 'Search'; break
      }
      case "spec_date": {
        this.typeOfSelector = 'Date'; break
      }
      case "report": {
        this.typeOfSelector = 'Report'; break
      }
    }
  }

  onSubmit(e:any) {
    
    //this.receipt.pullData()
    const selector = this.categories.get('selector')?.value
    switch (selector) {
      case "report": {
        const reportSelector = this.categories.get('reportCat')?.value
        if (!reportSelector) return
        this.receipt.pullData(reportSelector)
        break
      }
      case "spec_date": {
        
        break
      }
      case "search": {
        
        break
      }
    }
  }

  get loaded() { return this.receipt.loaded }
  get data() { return this.receipt.data}
}
