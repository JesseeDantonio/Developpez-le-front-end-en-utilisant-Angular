import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { filter, Observable, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChartOptions } from 'src/app/core/types/PieChartOptions';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  standalone: true,
  imports: [NgApexchartsModule],
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  public countryID: string | null | undefined;
  public chartOptions: PieChartOptions | undefined;
  public sub: Subscription | undefined;
  public nameCountry: string | undefined;
  public totalMedals: string | undefined;
  public totalAthletes: string | undefined;
  public totalEntries: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) { }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.countryID = this.route.snapshot.paramMap.get('id')?.valueOf();
    this.sub = this.olympicService
      .getOlympics()
      .pipe(filter((value): value is Olympic[] => Array.isArray(value)))
      .subscribe((data) => this.buildChart(data));

  }

  private buildChart(data: Olympic[]): void {

    if (this.countryID) {
      const serieData: Olympic | undefined = data.find(
        (country: Olympic) => {
          return country.id == Number(this.countryID);
        }
      );

      if(!serieData) this.goToNotFound();

      if (serieData) {
        this.totalMedals = serieData.participations
          .reduce(
            (sum: number, participation: any) =>
              sum + participation.medalsCount,
            0
          )
          .toString();
        this.totalAthletes = serieData.participations
          .reduce(
            (sum: number, participation: Participation) =>
              sum + participation.athleteCount.valueOf(),
            0
          )
          .toString();
        this.totalEntries = serieData.participations
          .reduce(
            (sum: number, participation: Participation) =>
              sum + 1,
            0
          )
          .toString();
        this.nameCountry = serieData.country;
        const medalsSerie = {
          name: 'Nombre de médailles',
          data: serieData.participations.map((p) => p.medalsCount),
        };
        const athletesSerie = {
          name: "Nombre d'athlètes",
          data: serieData.participations.map((p) => p.athleteCount),
        };

        const labels = serieData.participations.map(
          (p) => `${p.year} - ${p.city}`
        );

        this.chartOptions = {
          labels,
          series: [medalsSerie, athletesSerie],
          chart: {
            type: 'line',
            height: 350,
          },
          xaxis: {
            categories: labels,
          },
          title: { text: 'Evolution du pays par édition des JO' },
          tooltip: {
            y: {
              formatter: (val: number) => `${val}`,
            },
          },
        };
      }
    }
  }


  goToDashboard(): void {
    this.router.navigate(['/']);
  }

  goToNotFound(): void {
    this.router.navigate(['/not-found'])
  }
}
