import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentGeneratorComponent } from './component-generator.component';

describe('ComponentGeneratorComponent', () => {
  let component: ComponentGeneratorComponent;
  let fixture: ComponentFixture<ComponentGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
