import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { PieChartOptions } from 'src/app/core/types/PieChartOptions';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  public chartOptions: PieChartOptions | undefined;
  public numberCountries = 0;
  public numberJOs = 0;

  private sub: Subscription | undefined;

  constructor(
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.sub = this.olympicService
      .getOlympics()
      .pipe(filter((value): value is Olympic[] => Array.isArray(value)))
      .subscribe((data) => this.buildChart(data));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private buildChart(data: Olympic[]): void {
    const labels: string[] = [];
    const series: number[] = [];
    const ids: number[] = [];

    data.forEach((country) => {
      const totalMedals = country.participations.reduce(
        (sum, participation) => sum + Number(participation.medalsCount),
        0
      );

      labels.push(country.country);
      series.push(totalMedals);
      ids.push(Number(country.id));
    });

    this.numberJOs = data.reduce(
      (acc, country) => acc + country.participations.length,
      0
    );

    const uniqueLabels = Array.from(new Set(labels));
    this.numberCountries = uniqueLabels.length;

    this.chartOptions = {
      series,
      labels: uniqueLabels,
      chart: {
        type: 'pie',
        height: 400,
        events: {
          dataPointSelection: (_, __, config) => {
            const countryID = ids[config.dataPointIndex];
            this.goToCountry(countryID);
          },
        },
      },
      xaxis: [],
      title: { text: '' },
      tooltip: {
        y: {
          formatter: (val: number) => `${val} medals`,
        },
      },
    };
  }

  private goToCountry(id: number): void {
    this.router.navigate(['/country', id]);
  }
}