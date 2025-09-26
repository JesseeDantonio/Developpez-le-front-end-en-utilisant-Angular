import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexTitleSubtitle, ApexTooltip } from 'ng-apexcharts';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive?: ApexResponsive[];
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};