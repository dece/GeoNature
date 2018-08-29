import { Component, OnInit, Input, ViewChild, HostListener, OnChanges } from '@angular/core';
import { GeoJSON } from 'leaflet';
import { MapListService } from '@geonature_common/map-list/map-list.service';
import { DataService } from '../../services/data.service';
import { SyntheseFormService } from '../../services/form.service';
import { window } from 'rxjs/operator/window';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '@geonature_common/service/common.service';
import { AppConfig } from '@geonature_config/app.config';
import { HttpParams } from '@angular/common/http/src/params';

@Component({
  selector: 'pnx-synthese-list',
  templateUrl: 'synthese-list.component.html',
  styleUrls: ['synthese-list.component.scss']
})
export class SyntheseListComponent implements OnInit, OnChanges {
  public SYNTHESE_CONFIG = AppConfig.SYNTHESE;
  public selectedObs: any;
  public previousRow: any;
  public rowNumber: number;
  public exportRoute = `${AppConfig.API_ENDPOINT}/synthese/export`;
  public queyrStringDownload: HttpParams;
  @Input() inputSyntheseData: GeoJSON;
  @ViewChild('table') table: any;
  constructor(
    public mapListService: MapListService,
    private _ds: DataService,
    public ngbModal: NgbModal,
    private _commonService: CommonService,
    private _fs: SyntheseFormService
  ) {}

  ngOnInit() {
    // get wiewport height to set the number of rows in the table
    const h = document.documentElement.clientHeight;
    this.rowNumber = Math.trunc(h / 62);

    // On map click, select on the list a change the page
    this.mapListService.onMapClik$.subscribe(id => {
      this.mapListService.selectedRow = []; // clear selected list

      const integerId = parseInt(id);
      let i;
      for (i = 0; i < this.mapListService.tableData.length; i++) {
        if (this.mapListService.tableData[i]['id_synthese'] === integerId) {
          this.mapListService.selectedRow.push(this.mapListService.tableData[i]);
          break;
        }
      }
      const page = Math.trunc(i / this.rowNumber);
      this.table.offset = page;
    });
  }

  // update the number of row per page when resize the window
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
    // if click twice on same row
    if (this.previousRow && this.previousRow === row) {
      console.log('twice');
      this.table.rowDetail.toggleExpandRow(this.previousRow);
      this.previousRow = null;
      // if click on new row when expanded already activated
    } else if (this.previousRow) {
      console.log('new');
      this.table.rowDetail.toggleExpandRow(this.previousRow);
      this.table.rowDetail.toggleExpandRow(row);
      this.previousRow = row;
      // if its first time
    } else {
      console.log('first');
      this.table.rowDetail.toggleExpandRow(row);
      this.previousRow = row;
    }
  }

  openDeleteModal(event, modal, iElement, row) {
    this.mapListService.selectedRow = [];
    this.mapListService.selectedRow.push(row);
    this.ngbModal.open(modal);
  }

  onEditReleve(url_source, id_source) {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = url_source + '/' + id_source;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  onDeleteObservation(id_synthese) {
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

  setQueryString() {
    const formatedParams = this._fs.formatParams();
    this.queyrStringDownload = this._ds.buildQueryUrl(formatedParams);
  }

  downloadData() {
    document.location.href = 'http://127.0.0.1:8000/synthese/export?export_format=csv';
  }

  ngOnChanges(changes) {
    if (changes && changes.inputSyntheseData.currentValue) {
      // reset page 0 when new data appear
      this.table.offset = 0;
    }
  }
}
