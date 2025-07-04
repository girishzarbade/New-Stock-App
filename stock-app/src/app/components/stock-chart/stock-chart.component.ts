import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { StockService, HistoricalData } from '../../services/stock.service';

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div class="chart-container">
      <canvas baseChart
        [data]="chartData"
        [options]="chartOptions"
        [type]="chartType">
      </canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      position: relative;
      height: 400px;
      width: 100%;
    }
  `]
})
export class StockChartComponent implements OnInit {
  @Input() symbol: string = '';

  chartType: ChartType = 'line';
  chartData: ChartConfiguration['data'] = { datasets: [] };
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toFixed(2)}`
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: { display: true, text: 'Date' },
        grid: { display: false }
      },
      y: {
        display: true,
        title: { display: true, text: 'Price ($)' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' }
      }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false }
  };

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.stockService.getHistoricalData(this.symbol).subscribe(data => {
      const labels = data.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });
      const prices = data.map(item => item.close);
      this.chartData = {
        labels,
        datasets: [
          {
            data: prices,
            label: this.symbol,
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#667eea',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
          }
        ]
      };
    });
  }
} 