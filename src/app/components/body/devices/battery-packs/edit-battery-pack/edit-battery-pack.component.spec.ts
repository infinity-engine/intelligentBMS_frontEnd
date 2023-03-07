import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatteryPackComponent } from './edit-battery-pack.component';

describe('EditBatteryPackComponent', () => {
  let component: EditBatteryPackComponent;
  let fixture: ComponentFixture<EditBatteryPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBatteryPackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBatteryPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
