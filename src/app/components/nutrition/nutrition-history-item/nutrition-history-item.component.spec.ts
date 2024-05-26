import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionHistoryItemComponent } from './nutrition-history-item.component';

describe('NutritionHistoryItemComponent', () => {
  let component: NutritionHistoryItemComponent;
  let fixture: ComponentFixture<NutritionHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionHistoryItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutritionHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
