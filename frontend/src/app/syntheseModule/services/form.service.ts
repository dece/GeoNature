import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { AppConfig } from '@geonature_config/app.config';
import { stringify } from 'wellknown';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { NgbDatePeriodParserFormatter } from '@geonature_common/form/date/ngb-date-custom-parser-formatter';

@Injectable()
export class SyntheseFormService {
  public searchForm: FormGroup;
  public selectedtaxonFromComponent = [];
  public selectedCdRefFromTree = [];

  constructor(
    private _fb: FormBuilder,
    private _dateParser: NgbDateParserFormatter,
    private _periodFormatter: NgbDatePeriodParserFormatter
  ) {
    this.searchForm = this._fb.group({
      cd_nom: null,
      observers: null,
      id_dataset: null,
      id_acquisition_frameworks: null,
      date_min: null,
      date_max: null,
      period_start: null,
      period_end: null,
      municipalities: null,
      geoIntersection: null,
      radius: null,
      taxonomy_lr: null,
      taxonomy_id_hab: null,
      taxonomy_group2_inpn: null
    });

    this.searchForm.setValidators([this.periodValidator()]);

    AppConfig.SYNTHESE.AREA_FILTERS.forEach(area => {
      const control_name = 'area_' + area.id_type;
      this.searchForm.addControl(control_name, new FormControl());
      const control = this.searchForm.controls[control_name];
      area['control'] = control;
    });
  }

  getCurrentTaxon($event) {
    this.selectedtaxonFromComponent.push($event.item);
    $event.preventDefault();
    this.searchForm.controls.cd_nom.reset();
  }

  removeTaxon(index) {
    this.selectedtaxonFromComponent.splice(index, 1);
  }

  formatParams() {
    const params = Object.assign({}, this.searchForm.value);
    const updatedParams = {};
    // tslint:disable-next-line:forin
    for (let key in params) {
      if ((key === 'date_min' && params.date_min) || (key === 'date_max' && params.date_max)) {
        updatedParams[key] = this._dateParser.format(params[key]);
      } else if (
        (key === 'period_max' && params.period_max) ||
        (key === 'period_min' && params.period_min)
      ) {
        updatedParams[key] = this._periodFormatter.format(params[key]);
        console.log(updatedParams);
      } else if (params['geoIntersection']) {
        updatedParams['geoIntersection'] = stringify(params['geoIntersection']);
        // if other key an value not null or undefined
      } else if (params[key]) {
        // if its an Array push only if > 0
        if (Array.isArray(params[key]) && params[key].length > 0) {
          updatedParams[key] = params[key];
          // else if its not an array, alway send the parameter
        } else if (!Array.isArray(params[key])) {
          updatedParams[key] = params[key];
        }
      }
    }
    if (this.selectedtaxonFromComponent.length > 0 || this.selectedCdRefFromTree.length > 0) {
      // search on cd_ref to include synonyme from the synthese searchs
      updatedParams['cd_ref'] = [
        ...this.selectedtaxonFromComponent.map(taxon => taxon.cd_ref),
        ...this.selectedCdRefFromTree
      ];
    }
    return updatedParams;
  }

  periodValidator(): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: boolean } => {
      const perioStart = formGroup.controls.period_start.value;
      const periodEnd = formGroup.controls.period_end.value;
      if ((perioStart && !periodEnd) || (!perioStart && periodEnd)) {
        return {
          invalidPeriod: true
        };
      }
      return null;
    };
  }
}
