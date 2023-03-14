import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesDefaultComponent } from './devices-default.component';

describe('DevicesDefaultComponent', () => {
  let component: DevicesDefaultComponent;
  let fixture: ComponentFixture<DevicesDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
