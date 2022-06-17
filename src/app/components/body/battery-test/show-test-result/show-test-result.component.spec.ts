import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTestResultComponent } from './show-test-result.component';

describe('ShowTestResultComponent', () => {
  let component: ShowTestResultComponent;
  let fixture: ComponentFixture<ShowTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTestResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
