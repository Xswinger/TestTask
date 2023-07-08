import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ExchangeRateProperties {
  year: number;
  parameter: ExchangeParameter;
  value: string;
}

export interface ExchangeParameter {
  id: number;
  type_parameter: string;
  name: string;
  base: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private http: HttpClient) {}

  getExchangeRate() {
    return this.http.get<ExchangeRateProperties[]>('./assets/test2.json');
  }
}
