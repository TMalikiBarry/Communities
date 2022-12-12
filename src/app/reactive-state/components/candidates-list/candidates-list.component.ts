import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CandidatesService} from "../../services/candidates.service";
import {Candidate} from "../../models/candidate.model";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  constructor(private cService: CandidatesService) {
  }

  ngOnInit(): void {
    this.initObservables();
    this.cService.getCandidatesFromServer();
  }

  private initObservables() {
    this.loading$ = this.cService.loading$;
    this.candidates$ = this.cService.candidates$;
  }
}
