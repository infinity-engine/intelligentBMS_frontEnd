import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBatteryPacksComponent } from './view-battery-packs.component';

describe('ViewBatteryPacksComponent', () => {
  let component: ViewBatteryPacksComponent;
  let fixture: ComponentFixture<ViewBatteryPacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBatteryPacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBatteryPacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
