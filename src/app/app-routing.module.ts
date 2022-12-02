import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { PropertyDetailsComponent } from "./pages/property-details/property-details.component";

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'property/:id', component: PropertyDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
