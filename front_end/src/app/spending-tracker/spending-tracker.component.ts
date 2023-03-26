import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { RecieptService } from '../reciept.service';

@Component({
  selector: 'app-spending-tracker',
  templateUrl: './spending-tracker.component.html',
  styleUrls: ['./spending-tracker.component.css']
})
export class SpendingTrackerComponent {
  constructor(private receipt:RecieptService, private elementRef:ElementRef) {

  }

  pieChartOptions = {
    responsive: true
  }
  selector:string = 'Today'
  visibleTable:boolean = false;

  pieChartLabels =  []

  // CHART COLOR.
  pieChartColor:any = [
      {
          backgroundColor: ['rgba(30, 169, 224, 0.8)',
          'rgba(255,165,0,0.9)',
          'rgba(139, 136, 136, 0.9)',
          'rgba(255, 161, 181, 0.9)',
          'rgba(255, 102, 0, 0.9)'
          ]
      }
  ]

  pieChartData:any = [
      { 
          data: []
      }
  ];

  ngOnInit () {

   

  }


  onChange(e:any) { 
    this.selector = e.target.value
  }

  updateChartData(e:any) {
    this.receipt.pullChartData(this.selector)
    this.visibleTable = !this.visibleTable
  }

  get chartData() { return this.receipt.chartData}
  get readyChart() { return this.receipt.readyChart}
}
