import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";
import { Router } from '@angular/router';
import { PieChartOptions } from 'src/app/core/types/PieChartOptions';
import { Olympic } from 'src/app/core/models/Olympic';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public chartOptions: PieChartOptions | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get<Olympic[]>('assets/mock/olympic.json').subscribe(data => {
      const labels: string[] = [];
      const series: number[] = [];
      data.forEach(country => {
        labels.push(country.country);
        const totalMedals = country.participations.reduce(
          (sum: number, participation: any) => sum + participation.medalsCount, 0
        );
        series.push(totalMedals);
      });

      this.chartOptions = {
        series,
        labels,
        chart: {
          type: "pie",
          height: 350,
          events: {
            dataPointSelection: (event, chartContext, config) => {
              const countryName = labels[config.dataPointIndex];
              this.goToCountry(countryName);
            }
          }
        },
        title: { text: "Répartition des médailles par pays" },
        tooltip: {
          y: {
            formatter: (val: number, opts?: any) =>
              `${labels[opts.dataPointIndex]}: ${val} médailles`
          }
        },
      };
    });
  }

  goToCountry(name: string) {
    this.router.navigate(['/country', name]);
  }
}