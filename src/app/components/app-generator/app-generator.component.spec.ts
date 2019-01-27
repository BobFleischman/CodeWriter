import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGeneratorComponent } from './app-generator.component';

describe('AppGeneratorComponent', () => {
  let component: AppGeneratorComponent;
  let fixture: ComponentFixture<AppGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
