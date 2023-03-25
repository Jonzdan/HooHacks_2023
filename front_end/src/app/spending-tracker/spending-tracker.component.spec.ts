import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingTrackerComponent } from './spending-tracker.component';

describe('SpendingTrackerComponent', () => {
  let component: SpendingTrackerComponent;
  let fixture: ComponentFixture<SpendingTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
