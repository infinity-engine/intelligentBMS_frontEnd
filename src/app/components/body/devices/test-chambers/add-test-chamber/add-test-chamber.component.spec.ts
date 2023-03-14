import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestChamberComponent } from './add-test-chamber.component';

describe('AddTestChamberComponent', () => {
  let component: AddTestChamberComponent;
  let fixture: ComponentFixture<AddTestChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
