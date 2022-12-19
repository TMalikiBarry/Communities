import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {exhaustMap, Observable, take, tap} from "rxjs";
import {Candidate} from "../../models/candidate.model";
import {CandidatesService} from "../../services/candidates.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
  candidate$!: Observable<Candidate>;
  loading$!: Observable<boolean>;

  constructor(private csService: CandidatesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading$ = this.csService.loading$;
    this.candidate$ = this.route.params.pipe(
      exhaustMap(params => this.csService.getCandidateById(+params['id'])),
    );
  }

  onHire() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.csService.hireCandidate(candidate.id);
        this.onGoBack();
      })
    ).subscribe();
  }

  onRefuse() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.csService.refuseCandidate(candidate.id);
        this.onGoBack();
      }),
    ).subscribe()
  }

  onGoBack() {
    this.router.navigateByUrl('reactive-state/candidates')
  }
}
