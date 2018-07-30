import { Component, OnInit, Input, ViewChild, HostListener, OnChanges } from '@angular/core';
import { GeoJSON } from 'leaflet';
import { MapListService } from '@geonature_common/map-list/map-list.service';
import { SYNTHESE_CONFIG } from '../../synthese.config';
import { DataService } from '../../services/data.service';
import { window } from 'rxjs/operator/window';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@geonature_common/service/common.service';

@Component({
  selector: 'pnx-synthese-list',
  templateUrl: 'synthese-list.component.html',
  styleUrls: ['synthese-list.component.scss']
})
export class SyntheseListComponent implements OnInit, OnChanges {
  public SYNTHESE_CONFIG = SYNTHESE_CONFIG;
  public selectedObs: any;
  public previousRow: any;
  public rowNumber: number;
  @Input() inputSyntheseData: GeoJSON;
  @ViewChild('table') table: any;
  constructor(
    public mapListService: MapListService,
    private _ds: DataService,
    public ngbModal: NgbModal,
    private _commonService: CommonService
  ) {}

  ngOnInit() {
    // Au clique sur la carte, selection dans la liste
    this.mapListService.onMapClik$.subscribe(id => {
      this.mapListService.selectedRow = []; // clear selected list

      const integerId = parseInt(id);
      // const integerId = parseInt(id);
      let i;
      for (i = 0; i < this.mapListService.tableData.length; i++) {
        if (this.mapListService.tableData[i]['id_synthese'] === integerId) {
          this.mapListService.selectedRow.push(this.mapListService.tableData[i]);
          break;
        }
      }
      const page = Math.trunc(i / 10);
      this.table.offset = page;
    });

    // get wiewport height to set the number of rows in the table
    const h = document.documentElement.clientHeight;
    this.rowNumber = Math.trunc(h / 62);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.rowNumber = Math.trunc(event.target.innerHeight / 62);
  }

  loadOneSyntheseReleve(event) {
    this._ds.getOneSyntheseObservation(event.value.id_synthese).subscribe(data => {
      this.selectedObs = data;
    });
  }

  toggleExpandRow(row) {
    if (this.previousRow) {
      this.table.rowDetail.toggleExpandRow(this.previousRow);
    }
    this.table.rowDetail.toggleExpandRow(row);
    this.previousRow = row;
  }

  openDeleteModal(event, modal, iElement, row) {
    console.log('LAAAAAAAAA/*  */');
    this.mapListService.selectedRow = [];
    this.mapListService.selectedRow.push(row);
    //event.stopPropagation();
    this.ngbModal.open(modal);

    // prevent erreur link to the component
    // iElement &&
    //   iElement.parentElement &&
    //   iElement.parentElement.parentElement &&
    //   iElement.parentElement.parentElement.blur();
  }

  onDeleteObservation(id_synthese) {
    console.log(id_synthese);
    this._ds.deleteOneSyntheseObservation(id_synthese).subscribe(
      data => {
        this.mapListService.deleteObsFront(id_synthese);
        this._commonService.translateToaster('success', 'Synthese.DeleteSuccess');
      },
      error => {
        if (error.status === 403) {
          this._commonService.translateToaster('error', 'NotAllowed');
        } else {
          this._commonService.translateToaster('error', 'ErrorMessage');
        }
      }
    );
  }

  ngOnChanges(changes) {
    if (changes && changes.inputSyntheseData.currentValue) {
      // reset page 0 when new data appear
      this.table.offset = 0;
    }
  }
}
