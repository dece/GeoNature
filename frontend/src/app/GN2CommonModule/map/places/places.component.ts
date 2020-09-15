import { Component, OnInit, ViewChild } from '@angular/core';
import { MarkerComponent } from '../marker/marker.component';
import { MapService } from '../map.service';
import { MapListService } from '../../map-list/map-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../../service/common.service';
import * as L from 'leaflet';
import { Subscription } from "rxjs/Subscription";
import { Map, GeoJSON, Layer, FeatureGroup, Marker, LatLng } from 'leaflet';
import { DataFormService } from '@geonature_common/form/data-form.service';


/**
 * Affiche une modale permettant de renseigner le nom d'un lieu et de l'enregistrer dans la table T_PLACE.
 *
 * Ce composant hérite du composant MarkerComponent: il dispose donc des mêmes inputs et outputs.
 */
@Component({
  selector: 'pnx-places',
  templateUrl: 'places.component.html'
})
export class PlacesComponent extends MarkerComponent implements OnInit {
  @ViewChild('modalContent') public modalContent: any;
  private geojsonSubscription$: Subscription;
  public geojson: GeoJSON.Feature;
  constructor(
    public mapService: MapService,
    public modalService: NgbModal,
    public commonService: CommonService,
    private _dfs: DataFormService,
    private _mapListServive: MapListService,
   
    
  ) {
    super(mapService, commonService);
  }

  ngOnInit() {
    this.map = this.mapservice.map;
    this.setPlacesLegend();
    
    this.geojsonSubscription$ = this.mapservice.gettingGeojson$.subscribe(geojson => {
      this.geojson = geojson;
    });
  }
  
  //marine
  setPlacesLegend() {
    // Marker
    const PlacesLegend = this.mapservice.addCustomLegend(
      'topleft',
      'PlacesLegend',
      'url(assets/images/location-save.png)'
    );
    this.map.addControl(new PlacesLegend());
    document.getElementById('PlacesLegend').title = "Enregistrer un lieu";
    L.DomEvent.disableClickPropagation(document.getElementById('PlacesLegend'));
    document.getElementById('PlacesLegend').onclick = () => {
      
      if(this.geojson == null){
        this.commonService.translateToaster('warning', 'Veuillez d\'abord saisir une géométrie sur la carte.');
      }else{
        var geom = this.geojson;
        this.modalService.open(this.modalContent);
      }
    };
  }


  addPlace(placeName:String) {
    this.geojson.properties['placeName'] = placeName.toString();
    var geom = this.geojson;
    this._dfs.addPlace(geom).subscribe(res => {
      this.commonService.translateToaster(res.status, res.message);
      if (res.status == "success"){
        this.modalService.dismissAll();
      }
    });
  }
  









}
