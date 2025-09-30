import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexTitleSubtitle, ApexTooltip, ApexXAxis } from 'ng-apexcharts';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  xaxis: any,
  responsive?: ApexResponsive[];
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};