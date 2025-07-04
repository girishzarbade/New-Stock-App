import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricData } from './historic-data';

describe('HistoricData', () => {
  let component: HistoricData;
  let fixture: ComponentFixture<HistoricData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
