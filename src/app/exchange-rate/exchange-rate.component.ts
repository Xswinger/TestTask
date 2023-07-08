import {Component, OnInit} from '@angular/core';
import {ExchangeRateService} from '../exchange-rate-service/exchange-rate.service'
import {Observable, of} from 'rxjs'

interface TableRow {
  id: number;
  mark1: string;
  mark2: string;
  mark3: string;
  2024?: string;
  2025?: string;
  2026?: string;
  2027?: string;
  2028?: string;
  2029?: string;
  2030?: string;
  2031?: string;
  2032?: string;
}


@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit{

  constructor(private exchangeRateService: ExchangeRateService) {}

  exchangeData: Observable<TableRow[]> = of([]);

  displayedColumns: string[] = ['id', 'indexFirst', 'indexSecond', 'indexThird', 'year2024', 'year2025',
    'year2026', 'year2027', 'year2028', 'year2029', 'year2030', 'year2031', 'year2032'];

  ngOnInit(): void {
    this.convertAppearance();
  }

  convertAppearance() {
    const dataStorage: Record<string, TableRow> = {};
    const exchangeRate = this.exchangeRateService.getExchangeRate();

    exchangeRate.forEach(data => {
      data.forEach(element=> {

        if (element.parameter.type_parameter == "Инфляция" || element.parameter.type_parameter == "Ключ") {
          element.value = (Number(element.value) * 100).toFixed(1) + "%";
        } else {
          element.value = Number(element.value).toFixed(2);
        }

        if (element.value.includes("NaN")) {
          element.value = "";
        }

        let rowKey = element.parameter.id + "#" + element.parameter.type_parameter + "#" +
          element.parameter.name + "#" + element.parameter.base;

        if (rowKey in dataStorage) {
          dataStorage[rowKey] = {
            ...dataStorage[rowKey],
            [element.year]: element.value
          }
        } else {
          dataStorage[rowKey] = {
            id: element.parameter.id,
            mark1: element.parameter.type_parameter,
            mark2: element.parameter.name,
            mark3: element.parameter.base,
            [element.year]: element.value,
          }
        }

      })
    }).then(() => {
        this.exchangeData = of(Object.values(dataStorage));
      })
  }
}
