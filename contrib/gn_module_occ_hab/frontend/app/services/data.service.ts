import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpEventType
} from "@angular/common/http";
import {
  DataFormService,
  FormatMapMime
} from "@geonature_common/form/data-form.service";

import { AppConfig } from "@geonature_config/app.config";
import { ModuleConfig } from "../module.config";

@Injectable()
export class OccHabDataService {
  constructor(
    private _http: HttpClient,
    private _gnDataService: DataFormService
  ) {}

  postStation(data) {
    return this._http.post(
      `${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/station`,
      data
    );
  }

  getStations(params?) {
    console.log("get statioooooooooooons");

    let queryString: HttpParams = new HttpParams();
    for (let key in params) {
      if (params[key]) {
        queryString = queryString.set(key, params[key]);
      }
    }
    return this._http.get<any>(
      `${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/stations`,
      { params: queryString }
    );
  }

  getOneStation(id_station) {
    return this._http.get<any>(
      `${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/station/${id_station}`
    );
  }

  exportStations(export_format, idsStation?: []) {
    const sub = this._http.post(
      `${AppConfig.API_ENDPOINT}/${ModuleConfig.MODULE_URL}/export_stations/${export_format}`,
      idsStation,
      {
        headers: new HttpHeaders().set(
          "Content-Type",
          `${FormatMapMime.get(export_format)}`
        ),
        observe: "events",
        responseType: "blob",
        reportProgress: true
      }
    );
    this._gnDataService.subscribeAndDownload(sub, "export_hab", export_format);
  }
}
