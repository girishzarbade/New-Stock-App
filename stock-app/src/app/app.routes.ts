import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StockSummaryComponent } from './components/stock-summary/stock-summary.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stock/:symbol', component: StockSummaryComponent },
  { path: '**', redirectTo: '' }
];
