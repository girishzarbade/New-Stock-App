import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { StockService, HistoricalData } from '../../services/stock.service';

@Component({
  selector: 'app-historic-data',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './historic-data.component.html',
  styleUrl: './historic-data.component.scss'
})
export class HistoricDataComponent implements OnInit {
  @Input() symbol: string = '';

  displayedColumns: string[] = ['date', 'open', 'high', 'low', 'close', 'volume'];
  dataSource: HistoricalData[] = [];
  loading = true;
  error = false;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.loadHistoricData();
  }

  loadHistoricData() {
    this.loading = true;
    this.error = false;

    this.stockService.getHistoricalData(this.symbol).subscribe({
      next: (data) => {
        this.dataSource = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        console.error('Error loading historic data:', err);
      }
    });
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getChangeColor(close: number, open: number): string {
    return close >= open ? 'positive' : 'negative';
  }

  getChange(close: number, open: number): number {
    return close - open;
  }

  getChangePercent(close: number, open: number): number {
    return ((close - open) / open) * 100;
  }
} 