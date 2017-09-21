import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapService } from './map.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Map, LatLngExpression} from 'leaflet';
import { AppConfig } from '../../../conf/app.config';
import 'leaflet-draw';
import * as L from 'leaflet';

@Component({
  selector: 'pnx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() baseMaps: any;
  @Input() center: Array<number>;
  @Input() zoom: number;
  searchLocation: string;
  constructor(private mapService: MapService, private modalService: NgbModal) {
    this.searchLocation = '';
  }

  ngOnInit() {
    this.initialize();
  }

  gotoLocation() {
    if (!this.searchLocation) { return; }
    this.mapService.search(this.searchLocation);
  }

  initialize() {
    const baseMaps = this.baseMaps || AppConfig.MAP.BASEMAP;
    const zoom = this.zoom || AppConfig.MAP.ZOOM_LEVEL;
    let center: LatLngExpression;
    if (this.center !== undefined) {
        center = L.latLng(this.center[0], this.center[1]);
    }else {
        center = L.latLng(AppConfig.MAP.CENTER[0], AppConfig.MAP.CENTER[1]);
    }

    const map = L.map('map', {
        zoomControl: false,
        center: center,
        zoom: zoom,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);
    const baseControl = {};
    AppConfig.MAP.BASEMAP.forEach( (basemap, index) => {
      const configObj  = (basemap as any).subdomains ?
      {attribution: basemap.attribution, subdomains: (basemap as any).subdomains} : {attribution: basemap.attribution};
      baseControl[basemap.name] = L.tileLayer(basemap.layer, configObj);
      if (index === 0) {
        map.addLayer(baseControl[basemap.name]);
      }
    });
    L.control.layers(baseControl).addTo(map);
    L.control.scale().addTo(map);

    this.mapService.setMap(map);
    this.mapService.initializeReleveFeatureGroup();

  }

}
