import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSummaryComponent } from './meal-summary.component';

describe('MealSummaryComponent', () => {
  let component: MealSummaryComponent;
  let fixture: ComponentFixture<MealSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});