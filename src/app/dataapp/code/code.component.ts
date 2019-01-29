import { Component, OnInit } from '@angular/core';
import { ItemObject } from 'src/app/models/item-object';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  item: ItemObject;
  constructor() {}

  ngOnInit() {
    this.item = JSON.parse(`{
      "fields": [
        {
          "name": "name",
          "label": "Field Name",
          "mask": "",
          "placeholder": "Field Name",
          "required": true,
          "regularexpression": "[a-z_]+$",
          "regularexpressionmsg": "Must be lower case and no spaces",
          "validations": [],
          "type": "string",
          "formFieldType": 0
        },
        {
          "name": "label",
          "label": "Label for Forms",
          "mask": "",
          "placeholder": "",
          "required": true,
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": [],
          "type": "string",
          "formFieldType": 0
        },
        {
          "name": "placeholder",
          "label": "Placeholder Text",
          "mask": "",
          "placeholder": "text to user in the placehold attribute",
          "required": false,
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": [{"type":"requried","errMsg":"Placeholder is required", "parameters":""}],
          "type": "string",
          "formFieldType": 0
        },
        {
          "name": "required",
          "label": "Required",
          "mask": "",
          "placeholder": "Is this field required on the form",
          "required": true,
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": [],
          "type": "boolean",
          "formFieldType": 5
        },
        {
          "name": "regularexpression",
          "label": "Regular Expression For Validation",
          "mask": "",
          "placeholder": "Validation Regular Expression",
          "required": false,
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": [],
          "type": "string",
          "formFieldType": 0
        },
        {
          "name": "regularexpressionmsg",
          "label": "RegExError Message",
          "mask": "",
          "placeholder": "Regular Expression Error Message",
          "required": false,
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": [],
          "type": "string",
          "formFieldType": 0
        },
        {
          "name": "type",
          "label": "Data Type",
          "mask": "",
          "placeholder": "string, Date, number, boolean",
          "required": true,
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": [],
          "type": "string",
          "formFieldType": 0
        },
        {
          "name": "validations",
          "label": "Validations",
          "mask": "",
          "placeholder": "Validation String (Not currently used)",
          "required": false,
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": [],
          "type": "[]",
          "formFieldType": 0
        },
        {
          "name": "formFieldType",
          "label": "Form Field Type",
          "mask": "",
          "placeholder": "INPUT, TEXTAREA, DATE, SELECT, PASSWORD, CHECKBOX",
          "required": true,
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": [],
          "type": "string",
          "formFieldType": 0
        }
      ],
      "name": "ObjectTemplate",
      "label": "Object Template"
    }`);
    const newFields = [];
    this.item.fields.forEach(element => {
      const f1 = new Field();
      // console.log('xx' + JSON.stringify(f1));
      // console.log(element);
      for (let key in element) {
        // console.log(key + ' ' + element[key]);
        f1[key] = element[key];
      }
      // console.log(JSON.stringify(f1));
      newFields.push(f1);
    });
    this.item.fields = newFields;
  }

}
