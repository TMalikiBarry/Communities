import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable, startWith} from "rxjs";
import {CandidatesService} from "../../services/candidates.service";
import {Candidate} from "../../models/candidate.model";
import {FormBuilder, FormControl} from "@angular/forms";
import {CandidateSearchType} from "../../emums/candidate-search-type.enum";

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesListComponent implements OnInit {

  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;
  searchCtrl!: FormControl;
  searchTypeCtrl = this.fb.control(CandidateSearchType.FIRSTNAME);

  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[]

  constructor(private cService: CandidatesService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.cService.getCandidatesFromServer();
  }

  private initObservables() {
    this.loading$ = this.cService.loading$;
    // this.candidates$ = this.cService.candidates$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(s => s.toLowerCase())
    );
    const searchType$ = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );

    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.cService.candidates$
    ]).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType as CandidateSearchType]
        .toLowerCase()
        .includes(search as string)))
    );
  }

  private initForm() {
    this.searchCtrl = this.fb.control('');
    this.searchTypeOptions = [
      {value: CandidateSearchType.FIRSTNAME, label: 'Prénom'},
      {value: CandidateSearchType.LASTNAME, label: 'Nom'},
      {value: CandidateSearchType.COMPANY, label: 'Entreprise'},
    ];
  }
}
