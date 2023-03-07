import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestChambersComponent } from './view-test-chambers.component';

describe('ViewTestChambersComponent', () => {
  let component: ViewTestChambersComponent;
  let fixture: ComponentFixture<ViewTestChambersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTestChambersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTestChambersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
