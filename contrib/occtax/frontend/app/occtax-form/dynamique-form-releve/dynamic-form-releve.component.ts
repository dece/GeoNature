import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild
} from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from "@angular/forms";
import { OcctaxFormService } from "../occtax-form.service";
import { ModuleConfig } from "../../module.config";

@Component({
  selector: "pnx-dynamic-form-releve",
  /*template: `
  <div class="row row-0 row-counting">
    <div class="form-group" >
      <small> test </small>
      <input 
        class="form-control form-control-sm" 
        type="text" 
      >
    </div>
  </div>
  `,*/
  template: `
  <pnx-dynamic-form-generator 
    [autoGenerated]='true'
    [myFormGroup]="formArray"
    [formsDefinition]="formConfigReleveDataSet"
    >
  </pnx-dynamic-form-generator>
  `,
  styles: [':host { width: 100%; }']
  //templateUrl: "./dynamicForm.component.html",
  //encapsulation: ViewEncapsulation.None
})
export class dynamicFormReleveComponent {
  @Input() formArray: FormGroup;
  @Input() formConfigReleveDataSet: any;
  @Output() output = new EventEmitter();

  //public FORM_CONFIG = ModuleConfig.add_fields[this.fs.currentIdDataset];
  //public FORM_CONFIG = ModuleConfig.add_fields[2]['releve'];
  //public dynamicFormGroup: FormGroup;
  public dynamicFormGroup: FormGroup;
  public formValue: any;

  constructor(
    private fb: FormBuilder,
    //private fs: OcctaxFormService,
  ) {}

  ngOnInit() {
    //en création, on crée le dynamique form
    if(!this.formArray){
      this.dynamicFormGroup = this.fb.group({});
      this.formArray = this.dynamicFormGroup;
    }
    this.formValue = this.formArray.value;
    const objFormChangeSubscription = this.formArray.valueChanges.subscribe(
      () => {
        if (this.isFormReady()) {
          objFormChangeSubscription.unsubscribe();
          //Si la valeur des champs du formulaire dynamique n'est pas renseignée, alors on la passe à null
          for (const key of Object.keys(this.formArray.value)){
            if (this.formValue[key] === undefined){
              this.formValue[key] =  this.formArray.value[key];
            }
          }
          this.formArray.setValue(this.formValue);
          //this.setDefaultFormValue();
        }
      }
    );
    // emit change programmatically
    this.formArray.updateValueAndValidity({ onlySelf: false, emitEvent: true });
  }

  isFormReady() {
    let schemaFormSize = this.formConfigReleveDataSet.filter(
      (elem) => elem.type_widget
    ).length;
    
    const formSize = Object.keys(this.formArray.controls).length;
    return schemaFormSize === formSize;
  }

}
