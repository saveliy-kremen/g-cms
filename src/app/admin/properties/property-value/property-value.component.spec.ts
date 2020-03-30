import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyValueComponent } from './property-value.component';

describe('PropertyValueComponent', () => {
  let component: PropertyValueComponent;
  let fixture: ComponentFixture<PropertyValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
