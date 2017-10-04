import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../../../conf/app.config';

@Injectable()
export class DataFormService {

  constructor(private _http: Http) {
   }

  getNomenclature(id_nomenclature: number, regne?: string, group2_inpn?: string) {
    const params: URLSearchParams = new URLSearchParams();
    regne ? params.set('regne', regne) : params.set('regne', '');
    group2_inpn ? params.set('group2_inpn', group2_inpn) : params.set('group2_inpn', '');
    return this._http.get(`${AppConfig.API_ENDPOINT}nomenclatures/nomenclature/${id_nomenclature}`, {search: params})
    .map(response => response.json());
    }

  getNomenclatures(id_nomenclatures: Array<any>) {
    const params: URLSearchParams = new URLSearchParams();
    id_nomenclatures.forEach(id => {
      params.append('id_type', id);
    });
    return this._http.get(`${AppConfig.API_ENDPOINT}nomenclatures/nomenclatures`, {search: params})
      .map(response => response.json());
  }

  getDatasets() {
    return this._http.get(`${AppConfig.API_ENDPOINT}meta/datasets`)
      .map(response => response.json());
  }

  getObservers(idMenu) {
     return this._http.get(`${AppConfig.API_ENDPOINT}users/menu/${idMenu}`)
      .map(response => response.json());
  }

  searchTaxonomy(taxonName: string, id: string) {
    return this._http.get(`${AppConfig.API_TAXHUB}taxref/allnamebylist/${id}?search_name=${taxonName}`)
    .map(res => res.json());
  }

  getTaxonInfo(cd_nom: number){
   return this._http.get(`${AppConfig.API_TAXHUB}taxref/${cd_nom}`)
    .map(res => res.json())
  }

  getGeoInfo(geojson) {
    return this._http.post(`${AppConfig.API_ENDPOINT}geo/info`, geojson)
      .map(response => response.json());
  }

  postContact(form) {
    return this._http.post(`${AppConfig.API_ENDPOINT}contact/releve`, form)
      .map(response => {
        if(response.status != 200){
          throw new Error('Post Error')
        }else{
          return response.json();
        } 
      });
  }

}
