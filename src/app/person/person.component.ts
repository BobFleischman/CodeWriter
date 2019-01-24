import { Component, OnInit, Input } from "@angular/core";
import { Person } from "../person";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.css"]
})
export class PersonComponent implements OnInit {
  dataform: FormGroup;

  @Input()
  firstData: Person;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dataform = this.fb.group({
      first: new FormControl(""),
      last: new FormControl(""),
      admin: new FormControl(""),
      birthdate: new FormControl(""),
      comment: new FormControl("")
    });
  }
}
