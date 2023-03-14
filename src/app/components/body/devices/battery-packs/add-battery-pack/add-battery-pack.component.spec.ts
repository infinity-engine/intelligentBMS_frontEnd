import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatteryPackComponent } from './add-battery-pack.component';

describe('AddBatteryPackComponent', () => {
  let component: AddBatteryPackComponent;
  let fixture: ComponentFixture<AddBatteryPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBatteryPackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBatteryPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
