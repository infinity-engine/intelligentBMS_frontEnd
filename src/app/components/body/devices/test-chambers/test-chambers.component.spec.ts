import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChambersComponent } from './test-chambers.component';

describe('TestChambersComponent', () => {
  let component: TestChambersComponent;
  let fixture: ComponentFixture<TestChambersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestChambersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChambersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
