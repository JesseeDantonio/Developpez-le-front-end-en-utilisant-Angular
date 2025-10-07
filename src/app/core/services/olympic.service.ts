import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root'
})
export class OlympicService {
  private readonly olympicUrl: string = './assets/mock/olympic.json';
  private readonly olympicsSubject$ = new BehaviorSubject<Olympic[] | null | undefined>(undefined);
  private sub: Subscription | undefined;

  constructor(private http: HttpClient) {
    this.sub = this.loadInitialData();
  }

  loadInitialData(): Subscription {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympicsSubject$.next(value)),
      catchError((error, caught) => {
        console.error('[OlympicService] loadOlympics failed', error);
        this.olympicsSubject$.next(null);
        return EMPTY;
      })
    ).subscribe();
  }

  getOlympics(): Observable<Olympic[] | null | undefined> {
    return this.olympicsSubject$.asObservable();
  }
}
