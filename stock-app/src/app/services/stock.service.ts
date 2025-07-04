import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OptionsData {
  expirationDate: string;
  strikePrice: number;
  callPrice: number;
  putPrice: number;
  callVolume: number;
  putVolume: number;
  callOpenInterest: number;
  putOpenInterest: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  // Using Alpha Vantage API for demo purposes
  private apiKey = 'demo'; // Replace with actual API key
  private baseUrl = 'https://www.alphavantage.co/query';

  constructor(private http: HttpClient) {}

  getStockQuote(symbol: string): Observable<StockData> {
    // For demo purposes, returning mock data
    // In production, you would use the actual API call
    return of(this.getMockStockData(symbol));
  }

  getHistoricalData(symbol: string, period: string = '1month'): Observable<HistoricalData[]> {
    // For demo purposes, returning mock data
    return of(this.getMockHistoricalData(symbol));
  }

  getOptionsData(symbol: string): Observable<OptionsData[]> {
    // For demo purposes, returning mock data
    return of(this.getMockOptionsData(symbol));
  }

  searchStocks(query: string): Observable<any[]> {
    // Mock search results
    const mockResults = [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'TSLA', name: 'Tesla Inc.' }
    ].filter(stock => 
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return of(mockResults);
  }

  private getMockStockData(symbol: string): StockData {
    const basePrice = 150 + Math.random() * 200;
    const change = (Math.random() - 0.5) * 10;
    
    return {
      symbol: symbol.toUpperCase(),
      name: this.getCompanyName(symbol),
      price: basePrice,
      change: change,
      changePercent: (change / (basePrice - change)) * 100,
      marketCap: 1000000000 + Math.random() * 9000000000,
      volume: 1000000 + Math.random() * 50000000,
      high: basePrice + Math.random() * 5,
      low: basePrice - Math.random() * 5,
      open: basePrice + (Math.random() - 0.5) * 2,
      previousClose: basePrice - change
    };
  }

  private getMockHistoricalData(symbol: string): HistoricalData[] {
    const data: HistoricalData[] = [];
    const basePrice = 150 + Math.random() * 200;
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const open = basePrice + (Math.random() - 0.5) * 10;
      const close = open + (Math.random() - 0.5) * 5;
      const high = Math.max(open, close) + Math.random() * 3;
      const low = Math.min(open, close) - Math.random() * 3;
      
      data.push({
        date: date.toISOString().split('T')[0],
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: 1000000 + Math.random() * 50000000
      });
    }
    
    return data;
  }

  private getMockOptionsData(symbol: string): OptionsData[] {
    const data: OptionsData[] = [];
    const basePrice = 150 + Math.random() * 200;
    
    for (let i = 0; i < 10; i++) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30 + (i * 30));
      
      const strikePrice = basePrice + (i - 5) * 5;
      const callPrice = Math.max(0, basePrice - strikePrice) + Math.random() * 5;
      const putPrice = Math.max(0, strikePrice - basePrice) + Math.random() * 5;
      
      data.push({
        expirationDate: expirationDate.toISOString().split('T')[0],
        strikePrice: parseFloat(strikePrice.toFixed(2)),
        callPrice: parseFloat(callPrice.toFixed(2)),
        putPrice: parseFloat(putPrice.toFixed(2)),
        callVolume: Math.floor(Math.random() * 1000),
        putVolume: Math.floor(Math.random() * 1000),
        callOpenInterest: Math.floor(Math.random() * 5000),
        putOpenInterest: Math.floor(Math.random() * 5000)
      });
    }
    
    return data;
  }

  private getCompanyName(symbol: string): string {
    const companies: { [key: string]: string } = {
      'AAPL': 'Apple Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corporation',
      'AMZN': 'Amazon.com Inc.',
      'TSLA': 'Tesla Inc.',
      'META': 'Meta Platforms Inc.',
      'NVDA': 'NVIDIA Corporation',
      'NFLX': 'Netflix Inc.',
      'JPM': 'JPMorgan Chase & Co.',
      'JNJ': 'Johnson & Johnson'
    };
    
    return companies[symbol.toUpperCase()] || `${symbol.toUpperCase()} Corporation`;
  }
} 