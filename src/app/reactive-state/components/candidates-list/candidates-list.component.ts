import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
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
    this.candidates$ = this.cService.candidates$;
  }

  private initForm() {
    this.searchCtrl = this.fb.control('');
    this.searchTypeOptions = [
      {value: CandidateSearchType.FIRSTNAME, label: 'Nom'},
      {value: CandidateSearchType.LASTNAME, label: 'Prénom'},
      {value: CandidateSearchType.COMPANY, label: 'Entreprise'},
    ];
  }
}
