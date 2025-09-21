import { Component } from "@angular/core";
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexResponsive, ApexTitleSubtitle, NgApexchartsModule } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
};

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  standalone: true,
  imports: [NgApexchartsModule]
})
export class HomeComponent {
  public chartOptions: ChartOptions = {
    series: [
      { name: "sales", data: [30, 40, 45, 50] }
    ],
    chart: { type: "polarArea", height: 350 },
    xaxis: { categories: [1991, 1992, 1993, 1994] },
    stroke: { curve: "smooth" },
    responsive: [],
    title: { text: "Exemple" }
  };
}