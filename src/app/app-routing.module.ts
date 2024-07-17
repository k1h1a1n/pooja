import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DaterangeComponent } from './daterange/daterange.component';
import { Daterange1Component } from './daterange1/daterange1.component';
import { DatematComponent } from './datemat/datemat.component';

const routes: Routes = [
  { path: '', redirectTo: 'datemat', pathMatch: 'full' },
  { path: 'menu', component: SideMenuComponent },
  { path: 'daterange', component: DaterangeComponent },
  {path:'daterange1', component:Daterange1Component},
  {path: 'datemat', component:DatematComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
