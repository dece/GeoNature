import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatPaginatorIntl } from '@angular/material';
import { CruvedStoreService } from '../GN2CommonModule/service/cruved-store.service';
import { DataFormService } from '@geonature_common/form/data-form.service';
import { Router, NavigationExtras } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { DataService } from "../../../../external_modules/import/frontend/app/services/data.service";
import { CommonService } from "@geonature_common/service/common.service";
import { SyntheseDataService } from '@geonature_common/form/synthese-form/synthese-data.service';


export class MetadataPaginator extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = 'Page suivante';
    this.previousPageLabel = 'Page précédente';
    this.itemsPerPageLabel = 'Éléments par page';
    this.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) {
        return `0 sur ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} sur ${length}`;
    };
  }
}

@Component({
  selector: 'pnx-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  providers: [
    {
      provide:MatPaginatorIntl,
      useClass: MetadataPaginator
    }

  ]
})
export class MetadataComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  model: NgbDateStruct;
  datasets = [];
  acquisitionFrameworks = [];
  tempAF = [];
  public history;
  public endPoint:string;
  public empty: boolean = false;
  expandAccordions = false;
  private researchTerm: string = '';
  private selector: string = 'all';
  public organisms: Array<any>;
  public roles: Array<any>;

  pageSize: number = 10;
  activePage: number = 0;
  pageSizeOptions: Array<number> = [10, 25, 50, 100];

  searchTerms : any = {};

  constructor(
    public _cruvedStore: CruvedStoreService,
    private _dfs: DataFormService,
    private _router: Router,
    private modal: NgbModal,
    public _ds: DataService,
    private _commonService: CommonService,
    public _dataService: SyntheseDataService
  ) { }

  ngOnInit() {
    this.getAcquisitionFrameworksAndDatasets();
    this.getImportList();
    this._dfs.getOrganisms().subscribe(data => {
      this.organisms = data;
    });
    this._dfs.getRoles({'group': false}).subscribe(data => {
      this.roles = data;
    });
  }
  //recuperation cadres d'acquisition
  getAcquisitionFrameworksAndDatasets() {
    this._dfs.getAfAndDatasetListMetadata({}).subscribe(data => {
      this.acquisitionFrameworks = data.data;
      this.tempAF = this.acquisitionFrameworks;
      this.datasets = [];
      this.acquisitionFrameworks.forEach(af => {
        af['datasetsTemp'] = af['datasets'];
        this.datasets = this.datasets.concat(af['datasets']);
      })

    });
  }
 
  // recuperer la liste des imports 
  getImportList() {
    this._ds.getImportList().subscribe(
      res => {
        this.history = res.history;
        this.empty = res.empty;
      },
      error => {
        if (error.statusText === "Unknown Error") {
          // show error message if no connexion
          this._commonService.regularToaster(
            "error",
            "ERROR: IMPOSSIBLE TO CONNECT TO SERVER (check your connexion)"
          );
        } else {
          // show error message if other server error
          this._commonService.regularToaster("error", error.error.message);
        }
      }
    );
  }

  /**
   *	Filtre les éléments CA et JDD selon la valeur de la barre de recherche
   **/
  updateSearchbar(event) {
    this.researchTerm = event.target.value.toLowerCase();

    //recherche des cadres d'acquisition qui matchent
    this.tempAF = this.acquisitionFrameworks.filter(af => {
      //si vide => affiche tout et ferme le panel
      if (this.researchTerm === '') {
        // 'dé-expand' les accodions pour prendre moins de place
        this.expandAccordions = false;
        //af.datasets.filter(ds=>true);
        af.datasetsTemp = af.datasets;
        return true;
      } else {
        // expand tout les accordion recherchés pour voir le JDD des CA
        this.expandAccordions = true;
        if ((af.id_acquisition_framework+' ').toLowerCase().indexOf(this.researchTerm) !== -1
          || af.acquisition_framework_name.toLowerCase().indexOf(this.researchTerm) !== -1
          || af.acquisition_framework_start_date.toLowerCase().indexOf(this.researchTerm) !== -1
          || af.creator_mail.toLowerCase().indexOf(this.researchTerm) !== -1
          || af.project_owner_name.toLowerCase().indexOf(this.researchTerm) !== -1 ) {
          //si un cadre matche on affiche tout ses JDD
          af.datasetsTemp = af.datasets;
          return true;
        }

        //Sinon on on filtre les JDD qui matchent eventuellement.
        if (af.datasets) {
          af.datasetsTemp = af.datasets.filter(
            ds => ((ds.id_dataset+' ').toLowerCase().indexOf(this.researchTerm) !== -1
                || ds.dataset_name.toLowerCase().indexOf(this.researchTerm) !== -1
                || ds.meta_create_date.toLowerCase().indexOf(this.researchTerm) !== -1)
          );
          return af.datasetsTemp.length;
        }
        return false;
      }
    });
    //retour à la premiere page du tableau pour voir les résultats
    this.paginator.pageIndex = 0;
    this.activePage = 0;
  }

  matchAf(af, criteria, value) {

    if (this.selector == 'all' || this.selector == 'af') {
      switch (criteria) {
        case 'num':
          if ((af.id_acquisition_framework+' ').toLowerCase().indexOf(value) !== -1)
            return true;
          break;
        case 'title1':
        case 'title2':
          if (af.acquisition_framework_name.toLowerCase().indexOf(value) !== -1)
            return true;
          break;
        case 'start_date':
          // console.log("value : " + value)
          // console.log(af.acquisition_framework_start_date)
          if (af.acquisition_framework_start_date.toString() == value)
            return true;
          break;
        case 'organism':
          if (af.actors.find(actor => actor.id_organism == value))
            return true;
          break;
        case 'role':
          if (af.actors.find(actor => actor.id_role == value))
            return true;
          break;
        default:
          return true;
      }
      if (this.selector == 'af')
        return false;
    }

    if (af.datasets) {
      if (this.selector == 'ds' || this.selector == 'all') {
        af.datasetsTemp = af.datasets.filter(
          ds => this.matchDs(ds, criteria, value)
        );
      } else {
        af.datasetsTemp = af.datasets;
      }
      console.log(af.datasetsTemp)
      return (af.datasetsTemp.length > 0);
    }

    return false;
    
  }

  matchDs(ds, criteria, value) {

    ((ds.id_dataset+' ').toLowerCase().indexOf(value) !== -1
                || ds.dataset_name.toLowerCase().indexOf(value) !== -1
                || ds.meta_create_date.toLowerCase().indexOf(value) !== -1)

    switch (criteria) {
      case 'num':
        if ((ds.id_dataset+' ').toLowerCase().indexOf(value) !== -1)
          return true;
        break;
      case 'title1':
      case 'title2':
        if (ds.dataset_name.toLowerCase().indexOf(value) !== -1)
          return true;
        break;
      case 'start_date':
        console.log("ds : " + ds.meta_create_date.toString().substring(0, 10))
        if (ds.meta_create_date.toString().substring(0, 10) == value)
          return true;
        break;
      case 'organism':
        if (ds.actors.find(actor => actor.id_organism == value))
          return true;
        break;
      case 'role':
        if (ds.actors.find(actor => actor.id_role == value))
          return true;
        break;
      default:
        return true;
    }

    return false;
  }

  updateAdvancedCriteria(event, criteria) {
    if (criteria != 'start_date')
      this.searchTerms[criteria] = event.target.value.toLowerCase();
    else
      this.searchTerms[criteria] = event.year
        + '-' + (event.month > 10 ? '' : '0') + event.month
        + '-' + (event.day > 10 ? '' : '0') + event.day;
  }

  updateSelector(event) {
    this.selector = event.target.value.toLowerCase();
    this.searchTerms['selector'] = this.selector;
  }

  reinitAdvancedCriteria() {
    this.searchTerms = { };
  }

  updateAdvancedSearch() {

    console.log("updateAdvancedSearch");
    console.log(this.searchTerms);

    this._dfs.getAfAndDatasetListMetadata(this.searchTerms).subscribe(data => {
      this.tempAF = data.data;
      this.datasets = [];
      this.tempAF.forEach(af => {
        af['datasetsTemp'] = af['datasets'];
        this.datasets = this.datasets.concat(af['datasets']);
      })

    });
  }

  openSearchModal(searchModal) {
    this.reinitAdvancedCriteria();
    this.updateAdvancedSearch();
    this.modal.open(searchModal);
  }

  openSyntheseNone(syntheseNone) {
    this.modal.open(syntheseNone);
  }

  closeSearchModal(searchModal) {
    this.modal.dismissAll(searchModal);
  }

  isDisplayed(idx: number) {
    //numero du CA à partir de 1
    let element = idx + 1;
    //calcule des tranches active à afficher
    let idxMin = this.pageSize * this.activePage;
    let idxMax = this.pageSize * (this.activePage + 1);

    return idxMin < element && element <= idxMax;
  }

  changePaginator(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.activePage = event.pageIndex;
  }

  deleteAf(af_id) {
    this._dfs.deleteAf(af_id).subscribe(
      res => this.getAcquisitionFrameworksAndDatasets()
    );
  }

  syntheseAf(af_id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id_acquisition_framework": af_id
      }
    };
    this._router.navigate(['/synthese'], navigationExtras);
  }

  deleteDs(ds_id) {
    this._dfs.deleteDs(ds_id).subscribe(
      res => this.getAcquisitionFrameworksAndDatasets()
    );
  }

  activateDs(ds_id, active) {
    console.log("activateDs(" + ds_id + ")");
    this._dfs.activateDs(ds_id, active).subscribe(
      res => this.getAcquisitionFrameworksAndDatasets()
    );
  }

  syntheseDs(ds_id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id_dataset": ds_id
      }
    };
    this._router.navigate(['/synthese'], navigationExtras);
  }

  importDs(ds_id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "datasetId": ds_id,
          "resetStepper": true
      }
    };
    this._router.navigate(['/import/process/step/1'], navigationExtras);
  }

  uuidReport(ds_id) {
    const ds = this.datasets.find(ds => ds.id_dataset == ds_id);
    this._dataService.downloadUuidReport(
      `UUID_JDD-${ds.id_dataset}_${ds.unique_dataset_id}`,
      {ds_id: ds_id}
    );
  }

  sensiReport(ds_id) {
    const ds = this.datasets.find(ds => ds.id_dataset == ds_id);
    this._dataService.downloadSensiReport(
      `Sensibilite_JDD-${ds.id_dataset}_${ds.unique_dataset_id}`,
      {ds_id: ds_id}
    );
  }

}
