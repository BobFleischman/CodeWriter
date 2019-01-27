import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsGeneratorComponent } from './components-generator.component';

describe('ComponentsGeneratorComponent', () => {
  let component: ComponentsGeneratorComponent;
  let fixture: ComponentFixture<ComponentsGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
