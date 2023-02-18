import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCellsComponent } from './view-cells.component';

describe('ViewCellsComponent', () => {
  let component: ViewCellsComponent;
  let fixture: ComponentFixture<ViewCellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCellsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
