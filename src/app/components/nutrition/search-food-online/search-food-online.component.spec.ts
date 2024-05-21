import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFoodOnlineComponent } from './search-food-online.component';

describe('SearchFoodOnlineComponent', () => {
  let component: SearchFoodOnlineComponent;
  let fixture: ComponentFixture<SearchFoodOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFoodOnlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchFoodOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
