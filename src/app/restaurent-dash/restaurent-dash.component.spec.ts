import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurentDashComponent } from './restaurent-dash.component';

describe('RestaurentDashComponent', () => {
  let component: RestaurentDashComponent;
  let fixture: ComponentFixture<RestaurentDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurentDashComponent]
    });
    fixture = TestBed.createComponent(RestaurentDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
