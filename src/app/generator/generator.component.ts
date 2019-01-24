import { Component, OnInit, Input } from '@angular/core';
import { ItemObject } from '../models/item-object';
import { Field } from '../models/field';
import { Types } from '../models/types.enum';
import { InputTypes } from '../models/input-types.enum';


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  item: ItemObject;
  constructor() {}

  ngOnInit() {
    this.item = new ItemObject();
    this.item.name = 'Person';
    this.item.label = 'firstData';
    let f = new Field('first', Types.STRING, 'First Name', '', InputTypes.INPUT);
    f.required = true;
    f.placeholder = 'Enter Nickname if applicable';
    this.item.fields.push(f);
    this.item.fields.push(
      new Field('last', Types.STRING, 'Last Name', '', InputTypes.INPUT)
    );
    f = new Field('admin', Types.BOOLEAN, 'Administrator', '', InputTypes.CHECKBOX);
    f.required = true;
    this.item.fields.push(f);
    this.item.fields.push(
      new Field('birthdate', Types.DATE, 'Birthday', '', InputTypes.DATE)
    );
    this.item.fields.push(
      new Field('comment', Types.STRING, 'Comments', '', InputTypes.TEXTAREA)
    );
  }

  f1() {}

  generateFieldList(obj: ItemObject): string {
    let reslt = '';
    obj.fields.forEach(f => {
      const line = `  ${f.name}: ${f.type};\n`;
      reslt = reslt + line;
    });
    console.log(reslt);
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

    @Input()
    ${obj.label}: ${obj.name};

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
    console.log(result);
    // var re = /[\n]+/g;
    // result = result.replace(re, '<br \>');
    return result;
  }

  getFormControl(f: Field): string {
    let result = `''`;
    if (f.required) {
      result = result + `, Validators.required`;
    }
    return result;
  }
  generateSubmitCode(): string {
    return `
    submitCode() {
      console.log('do something here');
    }
    `;
  }

  generateHTMLCode(obj: ItemObject): string {
    let result = '';
    const top = `<h2>${obj.label}</h2>
    <form [formGroup]='dataform' (ngSubmit)='onSubmit(userform.value)'>
    <p-panel header='${obj.name}'>
        <div class='ui-grid ui-grid-responsive ui-grid-pad ui-fluid' style='margin: 10px 0px'>\n`;
  const buttonRow = `           <div class='ui-grid-row'>
<div class='ui-grid-col-2'></div>
<div class='ui-grid-col-6'>
    <button pButton type='submit' label='Submit' [disabled]='!dataform.valid'></button>
</div>
<div class='ui-grid-col-4'></div>
</div>`;
    const bottom = `        </div>
    </p-panel>
</form>\n`;
    obj.fields.forEach(f => {
      // console.log(this.generateHTMLCodeRow(f));
      result = result + this.generateHTMLCodeRow(f);
    });
    result = top + result + buttonRow + bottom;
    console.log('XXXXXXXXXXXXXXXXX: ' + result);
    // var re = /[\n]/g;
    // result = result.replace(re, '<br \>');
    return result;
  }

  generateHTMLCodeRow(f: Field): string {
    const line = `<div class='ui-grid-row'>
    <div class='ui-grid-col-2'>
        ${f.label} *:
    </div>
    <div class='ui-grid-col-6'>` + this.getInputType(f) + `

    </div>
    <div class='ui-grid-col-4'>
        <p-message severity='error' text='${f.label} is required' *ngIf="!dataform.controls['${f.name}'].valid&&dataform.controls['${f.name}'].dirty"></p-message>
    </div>
</div>\n`;
    return line;
  }

  getInputType(f: Field): string {
    const result = '';
    const ty = f.formFieldType;
    switch (ty) {
      case InputTypes.INPUT: {
        return `<input pInputText type='text' formControlName='${f.name}' placeholder='${f.placeholder}'/>`;
        break;
      }
      case InputTypes.PASSWORD: {
        return `<input pInputText type='password' formControlName='${f.name}' placeholder='${f.placeholder}'/>`;
        break;
      }
      case InputTypes.CHECKBOX: {
        return `<p-checkbox formControlName='${f.name}' binary='true'></p-checkbox>`;
        break;
      }
      case InputTypes.TEXTAREA: {
        return `<textarea formControlName='${f.name}' rows='5' cols='30' pInputTextarea autoResize='autoResize'></textarea>`;
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
}
