import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { PieChartOptions } from 'src/app/core/types/PieChartOptions';
import { Olympic } from 'src/app/core/models/Olympic';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public chartOptions: PieChartOptions | undefined;
  public numberCountries: number = 0;
  public numberJOs: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Olympic[]>('assets/mock/olympic.json').subscribe((data) => {
      let labels: string[] = [];
      const series: number[] = [];
      const ids: Number[] = [];

      data.forEach((country) => {
        const totalMedals = country.participations.reduce(
          (sum: number, participation: any) => sum + participation.medalsCount,
          0
        );
        labels.push(country.country);
        series.push(totalMedals);
        ids.push(country.id);
      });

      this.numberJOs = labels.length;
      labels = [...new Set(labels)];
      this.numberCountries = labels.length;

      this.chartOptions = {
        series,
        labels,
        chart: {
          type: 'pie',
          height: 400,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const countryID = ids[config.dataPointIndex];
              this.goToCountry(countryID);
            },
          },
        },
        xaxis: {
          categories: []
        },
        title: { text: '' },
        tooltip: {
          y: {
            formatter: (val: number, opts?: any) => `${val} medals`,
          },
        },
      };
    });
  }

  goToCountry(id: Number) {
    this.router.navigate(['/country', id]);
  }
}
