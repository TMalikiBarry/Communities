import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, delay, map, Observable, switchMap, take, tap} from "rxjs";
import {Candidate} from "../models/candidate.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class CandidatesService {
  private lastCandidatesLoad = 0;

  constructor(private http: HttpClient) {
  }

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _candidates$ = new BehaviorSubject<Candidate[]>([]);

  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  getCandidatesFromServer() {
    if (Date.now() - this.lastCandidatesLoad <= 300_000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Candidate[]>(`${environment.apiURL}/candidates`).pipe(
      delay(1000),
      tap(candidates => {
        this.lastCandidatesLoad = Date.now();
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      }),
    ).subscribe();
  }

  getCandidateById(id: number): Observable<Candidate> {
    if (!this.lastCandidatesLoad) {
      this.getCandidatesFromServer();
    }
    return this.candidates$.pipe(
      // tap(() => this.getCandidatesFromServer()),
      map(candidates => candidates.filter(candidate => candidate.id === id)[0]),
      // map(candidates => candidates.find(candidate => candidate.id === id)),
    );
  }

  refuseCandidate(id: number) {
    this.setLoadingStatus(true);
    this.http.delete(`${environment.apiURL}/candidates/${id}`).pipe(
      delay(1000),
      switchMap(() => this.candidates$),
      take(1),
      map(candidates => candidates.filter(candidate => !(candidate.id === id))),
      tap((candidates) => {
        this._candidates$.next(candidates);
        this.setLoadingStatus(false)
      })
    ).subscribe()
  }

  private setLoadingStatus(loading: boolean): void {
    this._loading$.next(loading);
  }

}
