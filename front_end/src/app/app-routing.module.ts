import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { SpendingTrackerComponent } from './spending-tracker/spending-tracker.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path: '', component: HomeComponent},
  {path:'history', component: HistoryComponent},
  {path:'spendingTracker', component: SpendingTrackerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
