import { Component, OnInit, Input } from '@angular/core';
import { ItemObject } from '../models/item-object';
import { Field } from '../models/field';
import { Types } from '../models/types.enum';
import { InputTypes } from '../models/input-types.enum';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  item: ItemObject;
  constructor() {}

  ngOnInit() {
    this.item = JSON.parse(`    {
      "fields": [
        {
          "placeholder": "Field Name",
          "required": true,
          "name": "name",
          "type": "string",
          "label": "Field Name",
          "regularexpression": "[a-z_]+$",
          "regularexpressionmsg": "Must be lower case and no spaces",
          "validations": "",
          "formFieldType": 0
        },
        {
          "placeholder": "",
          "required": true,
          "name": "label",
          "type": "string",
          "label": "Label for Forms",
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": "",
          "formFieldType": 0
        },
        {
          "placeholder": "text to user in the placehold attribute",
          "required": false,
          "name": "placeholder",
          "type": "string",
          "label": "Placeholder Text",
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": "",
          "formFieldType": 0
        },
        {
          "placeholder": "Is this field required on the form",
          "required": true,
          "name": "required",
          "type": "boolean",
          "label": "Required",
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": "",
          "formFieldType": 5
        },
        {
          "placeholder": "Validation Regular Expression",
          "required": false,
          "name": "regularexpression",
          "type": "string",
          "label": "Regular Expression For Validation",
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": "",
          "formFieldType": 0
        },
        {
          "placeholder": "Regular Expression Error Message",
          "required": false,
          "name": "regularexpressionmsg",
          "type": "string",
          "label": "RegExError Message",
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": "",
          "formFieldType": 0
        },
        {
          "placeholder": "string, Date, number, boolean",
          "required": true,
          "name": "type",
          "type": "string",
          "label": "Data Type",
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": "",
          "formFieldType": 0
        },
        {
          "placeholder": "Validation String (Not currently used)",
          "required": false,
          "name": "validations",
          "type": "string",
          "label": "Validations",
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": "",
          "formFieldType": 0
        },
        {
          "placeholder": "INPUT, TEXTAREA, DATE, SELECT, PASSWORD, CHECKBOX",
          "required": true,
          "name": "formFieldType",
          "type": "string",
          "label": "Form Field Type",
          "regularexpression": "",
          "regularexpressionmsg": "",
          "validations": "",
          "formFieldType": 0
        }
      ],
      "name": "ObjectTemplate",
      "label": "Object Template"
    }

    `);
    const newFields = [];
    this.item.fields.forEach(element => {
      const f1 = new Field();
      for (let key in element) {
        f1[key] = element[key];
      }
      newFields.push(f1);
    });
    this.item.fields = newFields;
    // this.item = new ItemObject();
    // this.item.name = 'Person';
    // this.item.label = 'firstData';
    // let f = new Field('first', Types.STRING, 'First Name', '', InputTypes.INPUT);
    // f.required = true;
    // f.placeholder = 'Enter Nickname if applicable';
    // this.item.fields.push(f);
    // this.item.fields.push(
    //   new Field('last', Types.STRING, 'Last Name', '', InputTypes.INPUT)
    // );
    // f = new Field('admin', Types.BOOLEAN, 'Administrator', '', InputTypes.CHECKBOX);
    // f.required = true;
    // this.item.fields.push(f);
    // this.item.fields.push(
    //   new Field('birthdate', Types.DATE, 'Birthday', '', InputTypes.DATE)
    // );
    // this.item.fields.push(
    //   new Field('comment', Types.STRING, 'Comments', '', InputTypes.TEXTAREA)
    // );
  }

  f1() {}

  generateFieldList(obj: ItemObject): string {
    let reslt = '';
    obj.fields.forEach(f => {
      const line = `  ${f.name}: ${f.type};\n`;
      reslt = reslt + line;
    });
    // console.log(reslt);
    return reslt;
  }

  generateImportCode(obj: ItemObject): string {
    return `import { Component, OnInit, Input } from '@angular/core';
    import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
    import { ${obj.name} } from 'src/app/models/${obj.name.toLowerCase()}';
    `;
  }
  generateComponentCode(obj: ItemObject, linebreak: string): string {
    let result = '';
    result = `dataform: FormGroup;

    ${this.getValidationMessages(obj)}

    @Input()
    ${obj.name.toLowerCase()}: ${obj.name};

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.dataform = this.fb.group({\n`;
    const fg = [];
    obj.fields.forEach(f => {
      fg.push(` '${f.name}': new FormControl(${this.getFormControl(f)})`);
    });
    result = result + fg.join(',\n') + '\n \n';
    result = result + '        });\n}';
    result = result + this.generateSubmitCode();
    // console.log(result);
    // var re = /[\n]+/g;
    // result = result.replace(re, '<br \>');
    return result;
  }

  getValidationMessages(obj: ItemObject) {
    let result = `account_validation_messages = {`;
    const msgs = [];
    obj.fields.forEach(f => {
      if (f.required || f.regularexpression.length > 0) {
        const lines = [];
        let line = `${f.name}: [`;
        if (f.required) {
          lines.push(`{ type: 'required', message: '${f.label} is required'}`);
        }
        if (f.regularexpression.length > 0) {
          lines.push(
            `{ type: 'pattern', message: '${f.label} must be ${
              f.regularexpressionmsg
            }'}`
          );
        }
        line = line + lines.join(',\n') + `]`;
        msgs.push(line);
      }
    });
    result = result + msgs.join(',\n') + '\n \n';
    result = result + `};`;
    return result;
  }

  getFormControl(f: Field): string {
    let result = `''`;
    if (f.required && f.regularexpression.length > 0) {
      result =
        result +
        `, Validators.compose([Validators.required, Validators.pattern('${
          f.regularexpression
        }')])`;
    } else {
      if (f.required) {
        result = result + `, Validators.required`;
      }
      if (f.regularexpression.length > 0) {
        result = result + `, Validators.pattern('${f.regularexpression}')`;
      }
    }
    return result;
  }

  generateSubmitCode(): string {
    return `
    onSubmit(data) {
      console.log(JSON.stringify(data));
    }
    `;
  }

  generateHTMLCode(obj: ItemObject): string {
    let result = '';
    const top = `<h2>${obj.label}</h2>
    <form [formGroup]='dataform' (ngSubmit)='onSubmit(dataform.value)'>
    <p-panel header='${obj.name}'>
`;
    const buttonRow = `           <div class='p-grid'>
<div class='p-col-2'></div>
<div class='p-col-6'>
    <button pButton type='submit' label='Submit' [disabled]='!dataform.valid'></button>
</div>
<div class='p-col-4'></div>
</div>`;
    const bottom = `
    </p-panel>
</form>\n`;
    obj.fields.forEach(f => {
      // console.log(this.generateHTMLCodeRow(f));
      result = result + this.generateHTMLCodeRow(f);
    });
    result = top + result + buttonRow + bottom;
    // console.log('XXXXXXXXXXXXXXXXX: ' + result);
    // var re = /[\n]/g;
    // result = result.replace(re, '<br \>');
    return result;
  }
  generateHTMLCodeRow(f: Field): string {
    let line = `
  <div class='p-grid'>
    <div class='p-col-2'>
      ${this.getInputLabel(f)}
    </div>
    <div class='p-col-6'>
      ${this.getInputType(f)}
    </div>
    <div class='p-col-4'>`;
    if (f.required) {
      line =
        line +
        `<span *ngFor="let validation of account_validation_messages.${f.name}">
      <p-message severity="error" text="{{validation.message}}" *ngIf="dataform.controls['${
        f.name
      }'].hasError(validation.type)"></p-message>
      </span>`;
    }
    line =
      line +
      `</div>
  </div>\n`;
    return line;
  }

  getInputLabel(f: Field): string {
    let result = f.label;
    if (f.required) {
      result = result + ' *';
    }
    return result + ':';
  }
  getInputType(f: Field): string {
    const result = '';
    const ty = f.formFieldType;
    switch (ty) {
      case InputTypes.INPUT: {
        return `<input pInputText class='ui-fluid ui-inputtext' type='text' formControlName='${
          f.name
        }' placeholder='${f.placeholder}'/>`;
        break;
      }
      case InputTypes.PASSWORD: {
        return `<input pInputText class='ui-fluid ui-inputtext' type='password' formControlName='${
          f.name
        }' placeholder='${f.placeholder}'/>`;
        break;
      }
      case InputTypes.CHECKBOX: {
        return `<p-checkbox formControlName='${
          f.name
        }' binary='true'></p-checkbox>`;
        break;
      }
      case InputTypes.TEXTAREA: {
        return `<textarea class='ui-fluid ui-inputtext' formControlName='${
          f.name
        }' rows='5' cols='30' pInputTextarea autoResize='autoResize'></textarea>`;
        break;
      }
      case InputTypes.DATE: {
        return `<p-calendar formControlName='${f.name}'></p-calendar>`;
        break;
      }
      default: {
        // statements;
        break;
      }
    }
    return result;
  }

  getCSS() {
    return `.ui-inputtext, .ui-button {
      width: 100%;
    }
    `;
  }

  copyToClip(id: string) {
    const el = document.getElementById(id) as HTMLPreElement;
    document.execCommand('copy');
  }
}
// Validators.pattern('[a-z]([a-z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*')
