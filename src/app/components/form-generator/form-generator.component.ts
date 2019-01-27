import { Component, OnInit, Input } from '@angular/core';
import { ItemObject } from 'src/app/models/item-object';
import { Field } from 'src/app/models/field';
import { InputTypes } from 'src/app/models/input-types.enum';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css']
})
export class FormGeneratorComponent implements OnInit {
  @Input()
  item: ItemObject;

  @Input()
  show: string;


  constructor() { }

  ngOnInit() {
  }

  showthis(type: string) {
    return type === this.show;
  }

  generateImportCode(obj: ItemObject): string {
    return `
import { Component, OnInit, Input } from '@angular/core';
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
    result = result + '        });\n}\n';
    result = result + this.generateSubmitCode();
    // console.log(result);
    // var re = /[\n]+/g;
    // result = result.replace(re, '<br \>');
    return result;
  }

  getValidationMessages(obj: ItemObject) {
    let result = `
    account_validation_messages = {`;
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

  // ----------------------------------------------------------------------------- //
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


}
