import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { Field } from 'src/app/models/field';
import { InputTypes } from 'src/app/models/input-types.enum';


@Component({
  selector: "app-field-form",
  templateUrl: "./field-form.component.html",
  styleUrls: ["./field-form.component.css"]
})
export class FieldFormComponent implements OnInit {

  dataform: FormGroup;

  account_validation_messages = {
    name: [
      { type: "required", message: "Field Name is required" },
      {
        type: "pattern",
        message: "Field Name must be Must be lower case and no spaces"
      }
    ],
    label: [{ type: "required", message: "Label for Forms is required" }],
    required: [{ type: "required", message: "Required is required" }],
    type: [{ type: "required", message: "Data Type is required" }],
    formFieldType: [
      { type: "required", message: "Form Field Type is required" }
    ]
  };
  _sourceField = new Field();

  @Output() update: EventEmitter<Field> = new EventEmitter();
  @Output() delete: EventEmitter<Field> = new EventEmitter();

  @Input('sourceField')
  set sourceField(value) {
    this._sourceField = value;
    this.dataform = this.fb.group({
      name: new FormControl(
        this._sourceField.name,
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-z_]+$")
        ])
      ),
      label: new FormControl(this._sourceField.label, Validators.required),
      placeholder: new FormControl(this._sourceField.placeholder),
      required: new FormControl(this._sourceField.required, Validators.required),
      regularexpression: new FormControl(this._sourceField.regularexpression),
      regularexpressionmsg: new FormControl(this._sourceField.regularexpressionmsg),
      type: new FormControl(this._sourceField.type, Validators.required),
      validations: new FormControl(this._sourceField.validations),
      formFieldType: new FormControl(InputTypes[this._sourceField.formFieldType], Validators.required)
    });
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dataform = this.fb.group({
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-z_]+$")
        ])
      ),
      label: new FormControl("", Validators.required),
      placeholder: new FormControl(""),
      required: new FormControl("", Validators.required),
      regularexpression: new FormControl(""),
      regularexpressionmsg: new FormControl(""),
      type: new FormControl("", Validators.required),
      validations: new FormControl(""),
      formFieldType: new FormControl("", Validators.required)
    });
  }

  onSubmit(data) {
    console.log("In ON submit " +  JSON.stringify(this._sourceField));
    console.log("dataForm: " + JSON.stringify(this.dataform.value));
    this.update.emit(this.dataform.value);
  }

  submitChange() {
    // console.log("Changes");
    // let index = this.item.fields.indexOf(this.cloneField);
    // console.log("Index " + index);
    // this.item.fields[index] = this.cloneField;
    // this.cloneField = null;
  }

  deleteThis() {
    this.delete.emit(this._sourceField);
  }

}
