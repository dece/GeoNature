import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfig } from '../../../conf/app.config';
import { GeoJSON } from 'leaflet';
import { MapListService } from '../../../core/GN2Common/map-list/map-list.service';
import { Subscription } from 'rxjs/Subscription';
import { ContactService } from '../services/contact.service';
import { CommonService } from '../../../core/GN2Common/service/common.service';
import { AuthService } from '../../../core/components/auth/auth.service';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ColumnActions } from '@geonature_common/map-list/map-list.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContactConfig } from '../contact.config';

@Component({
  selector: 'pnx-contact-map-list',
  templateUrl: 'contact-map-list.component.html',
  styleUrls: ['./contact-map-list.component.scss', '../../../core/GN2Common/map-list/map-data/map-data.component.scss']
})

export class ContactMapListComponent implements OnInit {
  public geojsonData: GeoJSON;
  public displayColumns: Array<any>;
  public availableColumns: Array<any>;
  public filterableColumns: Array<any>;
  public pathEdit: string;
  public pathInfo: string;
  public idName: string;
  public apiEndPoint: string;
  public inputTaxon = new FormControl();
  public inputObservers = new FormControl();
  public dateMinInput = new FormControl();
  public dateMaxInput = new FormControl();
  public observerAsTextInput = new FormControl();
  public columnActions: ColumnActions;
  public contactConfig: any;
  constructor( private _http: Http, private mapListService: MapListService, private _contactService: ContactService,
    private _commonService: CommonService, private _auth: AuthService,
    private _translate: TranslateService,
    private _router: Router,
    public ngbModal: NgbModal,
  ) { }

  ngOnInit() {
    this.contactConfig = ContactConfig;
  // parameters for maplist
  // columns to be default displayed
  this.displayColumns = [
   {prop: 'taxons', name: 'Taxon', display: true},
   {prop: 'observateurs', 'name': 'Observateurs'},
  ];
  this.mapListService.displayColumns = this.displayColumns;

  // columns available for display
  this.availableColumns = [
    {prop: 'altitude_max', name: 'altitude_max'},
    {prop: 'altitude_min', name: 'altitude_min'},
    {prop: 'comment', name: 'Commentaire'},
    {prop: 'date_max', name: 'Date fin'},
    {prop: 'date_min', name: 'Date début'},
    {prop: 'id_dataset', name: 'ID dataset'},
    {prop: 'id_digitiser', name: 'ID rédacteur'},
    {prop: 'id_releve_contact', name: 'ID relevé'},
    {prop: 'observateurs', name: 'observateurs'},
    {prop: 'taxons', name: 'taxons'}
  ];
  this.mapListService.availableColumns = this.availableColumns;
  // column available to filter
  this.filterableColumns = [
    {prop: 'altitude_max', name: 'altitude_max'},
    {prop: 'altitude_min', name: 'altitude_min'},
    {prop: 'comment', name: 'Commentaire'},
    {prop: 'id_dataset', name: 'ID dataset'},
    {prop: 'id_digitiser', name: 'Id rédacteur'},
    {prop: 'id_releve_contact', name: 'Id relevé'},
  ];
  this.mapListService.filterableColumns = this.filterableColumns;
  this.idName = 'id_releve_contact';
  this.apiEndPoint = 'contact/vreleve';

  // FETCH THE DATA
  this.mapListService.getData('contact/vreleve');

  // end OnInit
  }

   taxonChanged(taxonObj) {
    this.mapListService.refreshData(this.apiEndPoint, {param: 'cd_nom', 'value': taxonObj.cd_nom});
  }

  observerChanged(observer) {
    this.mapListService.refreshData(this.apiEndPoint, {param: 'observer', 'value': observer.id_role});
  }

  observerDeleted(observer) {
    const idObservers = this.mapListService.urlQuery.getAll('observer');
    this.mapListService.urlQuery = this.mapListService.urlQuery.delete('observer');
    idObservers.forEach(id => {
      if (id !== observer.id_role) {
        this.mapListService.urlQuery = this.mapListService.urlQuery.set('observer', id);
      }
    });
    this.mapListService.refreshData(this.apiEndPoint);
  }

  observerTextChange(observer) {
    this.mapListService.refreshData(this.apiEndPoint, {param: 'observateurs', 'value': observer});
  }

  observerTextDelete() {
    this.mapListService.deleteAndRefresh(this.apiEndPoint, 'observateurs');
  }

  dateMinChanged(date) {
    this.mapListService.urlQuery = this.mapListService.urlQuery.delete('date_up');
    if (date.length > 0) {
      this.mapListService.refreshData(this.apiEndPoint, {param: 'date_up', 'value': date});
    } else {
      this.mapListService.deleteAndRefresh(this.apiEndPoint, 'date_up');
    }
  }
  dateMaxChanged(date) {
    this.mapListService.urlQuery = this.mapListService.urlQuery.delete('date_low');
    if (date.length > 0) {
      this.mapListService.refreshData(this.apiEndPoint, {param: 'date_low', 'value': date});
    }else {
      this.mapListService.deleteAndRefresh(this.apiEndPoint, 'date_low');
    }
  }

  onEditReleve(id_releve) {
    this._router.navigate(['occtax/form', id_releve]);
  }

  onDetailReleve(id_releve) {
    this._router.navigate(['occtax/info', id_releve]);
  }

  onDeleteReleve(id) {
    this._contactService.deleteReleve(id)
      .subscribe(
        data => {
          this.mapListService.deleteObs(id);
            this._commonService.translateToaster('success', 'Releve.DeleteSuccessfully');

        },
        error => {
          if (error.status === 403) {
            this._commonService.translateToaster('error', 'NotAllowed');
          } else {
            this._commonService.translateToaster('error', 'ErrorMessage');
          }

        });
   }

   openDeleteModal(event, modal, iElement, row) {
    this.mapListService.selectedRow = [];
    this.mapListService.selectedRow.push(row);
    event.stopPropagation();
    // prevent erreur link to the component
    iElement && iElement.parentElement && iElement.parentElement.parentElement &&
    iElement.parentElement.parentElement.blur();
    this.ngbModal.open(modal);
  }


  onAddReleve() {
    this._router.navigate(['occtax/form']);
  }

  refreshFilters() {
    this.inputTaxon.reset();
    this.dateMaxInput.reset();
    this.dateMinInput.reset();
    this.inputObservers.reset();
    this.mapListService.genericFilterInput.reset();
    this.mapListService.refreshUrlQuery();
    this.mapListService.refreshData(this.apiEndPoint);
  }

}


