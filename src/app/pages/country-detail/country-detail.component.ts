import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  standalone: false,
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {

  public country : string | null | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('name');
  }
}
