import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { EResultTypes } from 'src/app/enum/EResultTypes';
import { EYears } from 'src/app/enum/EYears';
import { ICharts } from 'src/app/interfaces/ICharts';
import { IFinancialResult } from 'src/app/interfaces/IFinancialResult';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public chart!: Chart;
  public charts!: ICharts;
  @Input() financialResults!: IFinancialResult[];

  constructor() {
    this.charts = {
      charts: [
        {
          name: EResultTypes.CA,
        },
        {
          name: EResultTypes.EBITDA,
        },
        {
          name: EResultTypes.LOSS,
        },
        {
          name: EResultTypes.MARGIN,
        },
      ],
    };
  }

  ngOnInit(): void {
    this.charts.charts.map((label) => this.createChart(label.name));
  }

  public createChart(label: string): void {
    this.chart = new Chart(label, {
      type: 'bar',
      data: {
        labels: ['2016', '2017'],
        datasets: [
          {
            data: this.selectGoodResult(label),
            backgroundColor: '#4e59ff',
            borderWidth: 1,
            barThickness: 23,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              font: {
                size: 15,
                weight: '500',
              },
            },
            suggestedMin: 0,
            suggestedMax: 5000000,
          },
          x: {
            ticks: {
              backdropColor: 'green',
              font: {
                size: 15,
                weight: '500',
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                family: 'Avenir',
                size: 15,
              },
            },
          },
        },
      },
    });
  }

  public selectGoodResult(label: string): number[] {
    switch (true) {
      case label === EResultTypes.CA:
        return [
          this.financialResults[EYears.FIRST].ca,
          this.financialResults[EYears.LAST].ca,
        ];
      case label === EResultTypes.EBITDA:
        return [
          this.financialResults[EYears.FIRST].ebitda,
          this.financialResults[EYears.LAST].ebitda,
        ];
      case label === EResultTypes.LOSS:
        return [
          this.financialResults[EYears.FIRST].loss,
          this.financialResults[EYears.LAST].loss,
        ];
      case label === EResultTypes.MARGIN:
        return [
          this.financialResults[EYears.FIRST].margin,
          this.financialResults[EYears.LAST].margin,
        ];
      default:
        return [];
    }
  }
}
