import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GN2CommonModule } from "@geonature_common/GN2Common.module";
import { Routes, RouterModule } from "@angular/router";
import { OccHabFormComponent } from "./components/occhab-form.component";
import { OccHabMapListComponent } from "./components/occhab-map-list.component";
import { OcchabMapListFilterComponent } from "./components/occhab-map-list-filter.component";
import { OccHabDataService } from "./services/data.service";
import { OcchabStoreService } from "./services/store.service";
import { OccHabMapListService } from "./services/occhab-map-list.service";

// my module routing
const routes: Routes = [
  { path: "form", component: OccHabFormComponent },
  { path: "form/:id_station", component: OccHabFormComponent },
  { path: "", component: OccHabMapListComponent }
];

@NgModule({
  declarations: [
    OccHabFormComponent,
    OccHabMapListComponent,
    OcchabMapListFilterComponent
  ],
  imports: [CommonModule, GN2CommonModule, RouterModule.forChild(routes)],
  providers: [OccHabDataService, OcchabStoreService, OccHabMapListService],
  bootstrap: []
})
export class GeonatureModule {}
