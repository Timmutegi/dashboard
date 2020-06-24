import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-policyholderschart',
  templateUrl: './policyholderschart.component.html',
  styleUrls: ['./policyholderschart.component.scss']
})
export class PolicyholderschartComponent implements OnInit {
  date: string[] = [];
  count: [];
  data: [];
  lineChartData: ChartDataSets[] = [
    {data: [10, 20, 30, 40, 50], label: 'Policy Holders'}
  ];


  lineChartLabels: Label[] = [this.data];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private api: ApiService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getPolicyHolders();
  }

  getPolicyHolders() {
    const ID = localStorage.getItem('partnerProductID');
    this.api.get(`PartnerProducts/${ID}/policyHolders`).subscribe(
      res => {
        res.forEach((element: { createdAt: string; }) => {
          element.createdAt = this.datePipe.transform(element.createdAt, 'shortDate');
        });
        res = res.slice(1).slice(-30);
        console.log(res);
        this.data = res.createdAt;
        // console.log(this.data);
        res.forEach(element => {
          const data = element.filter(x => x === '6/18/20').length;
        });
        const test = res.createdAt.filter((x: string) => x === '6/18/20').length;
        console.log(test);
        // this.lineChartLabels = res.createdAt;
        // console.log(res);
        // this.lineChartLabels = this.data.createdAt;
        // this.isLoading = false;
        // this.dataSource.data = res;
      }
    );
  }

}
