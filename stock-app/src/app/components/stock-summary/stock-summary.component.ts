import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StockService, StockData } from '../../services/stock.service';


@Component({
  selector: 'app-stock-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './stock-summary.component.html',
  styleUrl: './stock-summary.component.scss'
})
export class StockSummaryComponent implements OnInit {
  stockData: StockData | null = null;
  loading = true;
  error = false;
  symbol: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
      this.loadStockData();
    });
  }

  loadStockData() {
    this.loading = true;
    this.error = false;
    
    this.stockService.getStockQuote(this.symbol).subscribe({
      next: (data) => {
        this.stockData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        console.error('Error loading stock data:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  getChangeColor(): string {
    if (!this.stockData) return '';
    return this.stockData.change >= 0 ? 'positive' : 'negative';
  }

  formatNumber(num: number): string {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';
    }
    return num.toLocaleString();
  }
} 