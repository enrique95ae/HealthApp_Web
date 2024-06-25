import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDoughnutComponent } from './summary-doughnut.component';

describe('SummaryDoughnutComponent', () => {
  let component: SummaryDoughnutComponent;
  let fixture: ComponentFixture<SummaryDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryDoughnutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});