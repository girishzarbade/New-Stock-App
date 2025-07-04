import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSummary } from './stock-summary';

describe('StockSummary', () => {
  let component: StockSummary;
  let fixture: ComponentFixture<StockSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
