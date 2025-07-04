import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

import { StockService, OptionsData } from '../../services/stock.service';

@Component({
  selector: 'app-options-data',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './options-data.component.html',
  styleUrl: './options-data.component.scss'
})
export class OptionsDataComponent implements OnInit {
  @Input() symbol: string = '';

  callDisplayedColumns: string[] = ['expirationDate', 'strikePrice', 'callPrice', 'callVolume', 'callOpenInterest'];
  putDisplayedColumns: string[] = ['expirationDate', 'strikePrice', 'putPrice', 'putVolume', 'putOpenInterest'];
  
  callDataSource: OptionsData[] = [];
  putDataSource: OptionsData[] = [];
  
  loading = true;
  error = false;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.loadOptionsData();
  }

  loadOptionsData() {
    this.loading = true;
    this.error = false;

    this.stockService.getOptionsData(this.symbol).subscribe({
      next: (data) => {
        this.callDataSource = data;
        this.putDataSource = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        console.error('Error loading options data:', err);
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

  formatPrice(price: number): string {
    return price > 0 ? `$${price.toFixed(2)}` : '-';
  }
} 