import { Types } from './types.enum';
import { InputTypes } from './input-types.enum';

export class Field {
    name: string = '';
    type: Types; // should be enumeration number, string, boolean, date. any
    label: string = '';
    mask: string = '';
    placeholder = '';
    required = false;
    regularexpression: string = '';
    regularexpressionmsg: string = '';
    validations: string = '';
    formFieldType: InputTypes;

    showJSON() {
        console.log(JSON.stringify(this));
    }


}

export function fieldconstructor(n: string, t: Types, l: string, v: string, fft: InputTypes) {
    let f = new Field();
    f.name = n;
    f.type = t;
    f.label = l;
    f.validations = v;
    f.formFieldType = fft;
    return f;
}
