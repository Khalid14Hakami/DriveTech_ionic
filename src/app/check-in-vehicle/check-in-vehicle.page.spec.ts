import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckInVehiclePage } from './check-in-vehicle.page';

describe('CheckInVehiclePage', () => {
  let component: CheckInVehiclePage;
  let fixture: ComponentFixture<CheckInVehiclePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CheckInVehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
