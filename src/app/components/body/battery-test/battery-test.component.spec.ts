import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryTestComponent } from './battery-test.component';

describe('BatteryTestComponent', () => {
  let component: BatteryTestComponent;
  let fixture: ComponentFixture<BatteryTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
