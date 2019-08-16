import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GN2CommonModule } from '@geonature_common/GN2Common.module';
import { SyntheseComponent } from './synthese.component';
import { SyntheseListComponent } from './synthese-results/synthese-list/synthese-list.component';
import { SyntheseCarteComponent } from './synthese-results/synthese-carte/synthese-carte.component';
import { SyntheseFormService } from '@geonature_common/form/synthese-form/synthese-form.service';
import { SyntheseStoreService } from '@geonature_common/form/synthese-form/synthese-store.service';
import { MapService } from '@geonature_common/map/map.service';
import { TreeModule } from 'angular-tree-component';
import { DynamicFormService } from '@geonature_common/form/dynamic-form/dynamic-form.service';
import { TaxonAdvancedStoreService } from '@geonature_common/form/synthese-form/advanced-form/synthese-advanced-form-store.service';
import { SyntheseModalDownloadComponent } from './synthese-results/synthese-list/modal-download/modal-download.component';
import { ModalInfoObsComponent } from './synthese-results/synthese-list/modal-info-obs/modal-info-obs.component';
const routes: Routes = [{ path: '', component: SyntheseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), GN2CommonModule, CommonModule, TreeModule.forRoot()],
  declarations: [
    SyntheseComponent,
    SyntheseListComponent,
    SyntheseCarteComponent,
    SyntheseModalDownloadComponent,
    ModalInfoObsComponent
  ],
  entryComponents: [SyntheseModalDownloadComponent, ModalInfoObsComponent],
  providers: [
    MapService,
    DynamicFormService,
    TaxonAdvancedStoreService,
    SyntheseStoreService,
    SyntheseFormService
  ]
})
export class SyntheseModule {}
