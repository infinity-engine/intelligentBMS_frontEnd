import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryPacksComponent } from './battery-packs.component';

describe('BatteryPacksComponent', () => {
  let component: BatteryPacksComponent;
  let fixture: ComponentFixture<BatteryPacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryPacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
