import { Component, OnInit, Input } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { Field } from 'src/app/models/field';


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

  @Input()
  sourceField: Field;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dataform = this.fb.group({
      name: new FormControl(
        this.sourceField.name,
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-z_]+$")
        ])
      ),
      label: new FormControl(this.sourceField.label, Validators.required),
      placeholder: new FormControl(this.sourceField.placeholder),
      required: new FormControl("", Validators.required),
      regularexpression: new FormControl(""),
      regularexpressionmsg: new FormControl(""),
      type: new FormControl("", Validators.required),
      validations: new FormControl(""),
      formFieldType: new FormControl("", Validators.required)
    });
  }

  onSubmit(data) {
    console.log(JSON.stringify(data));
  }
}
