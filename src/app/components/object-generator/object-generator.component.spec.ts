import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectGeneratorComponent } from './object-generator.component';

describe('ObjectGeneratorComponent', () => {
  let component: ObjectGeneratorComponent;
  let fixture: ComponentFixture<ObjectGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
