import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllTestsResultComponent } from './show-all-tests-result.component';

describe('ShowAllTestsResultComponent', () => {
  let component: ShowAllTestsResultComponent;
  let fixture: ComponentFixture<ShowAllTestsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllTestsResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAllTestsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
