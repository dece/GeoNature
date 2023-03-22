import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { distinctUntilChanged, map, filter, pairwise, tap } from 'rxjs/operators';

@Injectable()
export class FormService {
  constructor() {}

  dateValidator(dateMinControl: AbstractControl, dateMaxControl: AbstractControl): ValidatorFn {
    return (formGroup: UntypedFormGroup): { [key: string]: boolean } => {
      const dateMin = dateMinControl.value;
      const dateMax = dateMaxControl.value;
      if (dateMin && dateMax) {
        const formatedDateMin = new Date(dateMin.year, dateMin.month - 1, dateMin.day);
        const formatedDateMax = new Date(dateMax.year, dateMax.month - 1, dateMax.day);
        if (formatedDateMax < formatedDateMin) {
          return {
            invalidDate: true,
          };
        } else {
          return null;
        }
      }
      return null;
    };
  }

  /**
   * Check that controlMin is < to controlMax
   * @param minControl
   * @param maxControl
   * @param validatorKeyName: name of the validator
   */
  minMaxValidator(
    minControl: AbstractControl,
    maxControl: AbstractControl,
    validatorKeyName: string
  ): ValidatorFn {
    return (formGroup: UntypedFormGroup): { [key: string]: boolean } => {
      const altMin = minControl.value;
      const altMax = maxControl.value;
      if (altMin && altMax && altMin > altMax) {
        return {
          [validatorKeyName]: true,
        };
      } else {
        return null;
      }
    };
  }

  hourAndDateValidator(
    dateMinControl: AbstractControl,
    dateMaxControl: AbstractControl,
    hourMinControl: AbstractControl,
    hourMaxControl: AbstractControl
  ) {
    return (formGroup: UntypedFormGroup): { [key: string]: boolean } => {
      const invalidHour = this.invalidHour(
        dateMinControl,
        dateMaxControl,
        hourMinControl,
        hourMaxControl
      );
      return invalidHour
        ? {
            invalidHour: true,
          }
        : null;
    };
  }

  invalidHour(
    dateMinControl: AbstractControl,
    dateMaxControl: AbstractControl,
    hourMinControl: AbstractControl,
    hourMaxControl: AbstractControl
  ) {
    const hourMin = hourMinControl.value;
    const hourMax = hourMaxControl.value;
    const dateMin = dateMinControl.value;
    const dateMax = dateMaxControl.value;

    // if hour min et pas hour max => set error
    if (hourMin && !hourMax) {
      return true;
      // if hour min et hour max => check validity
    } else if (dateMin && dateMax && hourMin && hourMax) {
      const formatedHourMin = hourMin.split(':').map((h) => parseInt(h));
      const formatedHourMax = hourMax.split(':').map((h) => parseInt(h));
      // Date month are initialized with month index ... 0 = janvier SO -1 .
      const formatedDateMin = new Date(dateMin.year, dateMin.month - 1, dateMin.day);
      const formatedDateMax = new Date(dateMax.year, dateMax.month - 1, dateMax.day);

      if (dateMin && dateMax) {
        formatedDateMin.setHours(formatedHourMin[0], formatedHourMin[1]);
        formatedDateMax.setHours(formatedHourMax[0], formatedHourMax[1]);
      }

      return formatedDateMin > formatedDateMax;
    }
    return null;
  }

  taxonValidator(taxControl: AbstractControl) {
    const currentTaxon = taxControl.value;
    if (!currentTaxon) {
      return null;
    } else if (!currentTaxon.cd_nom && !currentTaxon.search_name) {
      return {
        invalidTaxon: true,
      };
    } else {
      return null;
    }
  }

  searchLocally(searchPatern, data) {
    const savedData = data;
    let filteredData = [];
    filteredData = savedData.filter((el) => {
      const isIn = el.label_default.toUpperCase().indexOf(searchPatern.toUpperCase());
      return isIn !== -1;
    });
    return filteredData;
  }

  // autoCompleteDate(
  //   formControl,
  //   dateMinControlName = 'date_min',
  //   dateMaxControlName = 'date_max'
  // ): Subscription {
  //   // date max autocomplete
  //   const dateMinControl: UntypedFormControl = formControl.get(dateMinControlName);
  //   const subscription = dateMinControl.valueChanges.subscribe((newvalue) => {
  //     // Get mindate and maxdate value before mindate change
  //     let oldmindate = formControl.value['date_min'];
  //     let oldmaxdate = formControl.value['date_max'];

  //     // Compare the dates before the change of the datemin.
  //     // If datemin and datemax were equal, maintain this equality
  //     // If they don't, do nothing
  //     // d oldmindate are objects. Strigify it for a right comparison
  //     if (oldmindate) {
  //       if (JSON.stringify(oldmaxdate) === JSON.stringify(oldmindate) || oldmaxdate == null) {
  //         formControl.patchValue({
  //           date_max: newvalue,
  //         });
  //       }
  //       // if olddatminDate is null => fill dateMax
  //     } else {
  //       formControl.patchValue({
  //         date_max: newvalue,
  //       });
  //     }
  //   });
  //   return subscription;
  // }

  autoCompleteDate(
    formControl,
    dateMinControlName = 'date_min',
    dateMaxControlName = 'date_max'
  ): Array<Subscription> {
    const subs = [];
    //date_min part : if date_max is empty or date_min == date_max
    const dateMinControl = formControl.get(dateMinControlName);
    const dateMaxControl = formControl.get(dateMaxControlName);
    // Compare the dates before the change of the datemin.
    // If datemin and datemax were equal, maintain this equality
    // If thetapy don't, do nothing
    // if date max is null -> set date min
    // dates are objects. Strigify it for a right comparison
    const sub1 = dateMinControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        pairwise(),
        filter(
          ([date_min_prev, date_min_new]) =>
            dateMaxControl.value === null ||
            JSON.stringify(date_min_prev) === JSON.stringify(dateMaxControl.value)
        ),
        map(([date_min_prev, date_min_new]) => date_min_new)
      )
      .subscribe((date_min) => dateMaxControl.setValue(date_min, { emitEvent: false }));

    subs.push(sub1);
    //date_max part : only if date_min is empty
    const sub2 = dateMaxControl.valueChanges
      .pipe(
        tap((el) => {
          console.log(el);
        }),
        distinctUntilChanged(),
        filter(() => dateMinControl.value === null)
      )
      .subscribe((date_max) => dateMinControl.setValue(date_max, { emitEvent: false }));
    subs.push(sub2);
    return subs;
  }
}
