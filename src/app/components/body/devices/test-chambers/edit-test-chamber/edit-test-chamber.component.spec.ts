import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestChamberComponent } from './edit-test-chamber.component';

describe('EditTestChamberComponent', () => {
  let component: EditTestChamberComponent;
  let fixture: ComponentFixture<EditTestChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTestChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTestChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
