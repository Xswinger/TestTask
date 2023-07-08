import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

export interface InfoData {
  newid: number;
  name: string;
  type: string;
  total: number;
  jan21: number;
  feb21: number;
  mar21: number;
  apr21: number;
  may21: number;
  jun21: number;
  jul21: number;
  aug21: number;
  sep21: number;
  oct21: number;
  nov21: number;
  dec21: number;
}


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getInfoData() {
    return this.http.get<InfoData[]>('http://127.0.0.1:8000/info-data/');
  }

}
