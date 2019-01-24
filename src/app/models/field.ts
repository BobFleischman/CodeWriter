import { Types } from './types.enum';
import { InputTypes } from './input-types.enum';

export class Field {
    name: string;
    type: Types; // should be enumeration number, string, boolean, date. any
    label: string;
    validations: string;
    formFieldType: InputTypes;

    constructor(n: string, t: Types, l: string, v: string, fft: InputTypes) {
        this.name = n;
        this.type = t;
        this.label = l;
        this.validations = v;
        this.formFieldType = fft;
    }

    showJSON() {
        console.log(JSON.stringify(this));
    }
}
