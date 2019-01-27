import { Component, OnInit, Input } from '@angular/core';
import { ItemObject } from 'src/app/models/item-object';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import { Field } from 'src/app/models/field';

@Component({
  selector: 'app-component-generator',
  templateUrl: './component-generator.component.html',
  styleUrls: ['./component-generator.component.css']
})
export class ComponentGeneratorComponent implements OnInit {
  @Input()
  item: ItemObject;

  @Input()
  show: string;


  constructor() { }

  ngOnInit() {
  }

  showthis(type: string) {
    console.log(`x${type}x + ' ' + x${this.show}x`);
    console.log(type === this.show);
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

}
