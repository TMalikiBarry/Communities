import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith, tap} from "rxjs";
import {ComplexFormService} from "../../services/complex-form.service";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {

  loading = false;
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  emailForm!: FormGroup;
  loginInfoForm!: FormGroup;
  contactPreferenceCntrl!: FormControl;
  phoneCntrl!: FormControl;
  emailCntrl!: FormControl;
  confirmEmailCntrl!: FormControl;
  passwordCntrl!: FormControl;
  confirmPasswordCntrl!: FormControl;
  showPhoneCntrl$!: Observable<boolean>;
  showEmailCntrl$!: Observable<boolean>;

  constructor(private fb: FormBuilder,
              private cfService: ComplexFormService) {
  }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  initFormControls() {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.contactPreferenceCntrl = this.fb.control('email');
    this.phoneCntrl = this.fb.control('');
    this.emailCntrl = this.fb.control('');
    this.confirmEmailCntrl = this.fb.control('');
    this.emailForm = this.fb.group({
      email: this.emailCntrl,
      confirm: this.confirmEmailCntrl,
    });
    this.passwordCntrl = this.fb.control('', Validators.required);
    this.confirmPasswordCntrl = this.fb.control('', Validators.required);
    this.loginInfoForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      password: this.passwordCntrl,
      confirmPassword: this.confirmPasswordCntrl
    })
  }

  initMainForm() {
    this.mainForm = this.fb.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCntrl,
      email: this.emailForm,
      phone: this.phoneCntrl,
      loginInfo: this.loginInfoForm
    });
  }

  initFormObservables() {
    this.showEmailCntrl$ = this.contactPreferenceCntrl.valueChanges.pipe(
      startWith(this.contactPreferenceCntrl.value),
      map((preference) => preference === 'email'),
      tap((showEmailForm) => this.setEmailValidators(showEmailForm))
    );
    this.showPhoneCntrl$ = this.contactPreferenceCntrl.valueChanges.pipe(
      startWith(this.contactPreferenceCntrl.value),
      map((preference) => preference === 'phone'),
      tap((showPhoneCntrl) => this.setPhoneValidators(showPhoneCntrl))
    );
  }

  setEmailValidators(showEmailForm: boolean) {
    if (showEmailForm) {
      this.emailCntrl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailCntrl.addValidators([Validators.required, Validators.email]);
    } else {
      this.emailCntrl.clearValidators();
      this.confirmEmailCntrl.clearValidators();
      this.emailForm.reset();
    }
    this.emailCntrl.updateValueAndValidity();
    this.confirmEmailCntrl.updateValueAndValidity();
  }

  setPhoneValidators(showPhoneCntrl: boolean) {
    if (showPhoneCntrl) {
      this.phoneCntrl.addValidators([Validators.required, Validators.pattern('((\\+|00)?[0-9]{3})?[0-9]{2}[0-9]{7}')]);
    } else {
      this.phoneCntrl.clearValidators();
      this.phoneCntrl.reset();
    }
    this.phoneCntrl.updateValueAndValidity();
  }

  onSubmitForm() {
    this.loading = true;
    this.cfService.saveUserInfo(this.mainForm.value).pipe(
      tap((saved) => {
        this.loading = false;
        if (saved) {
          this.mainForm.reset();
          this.contactPreferenceCntrl.patchValue('email');
        } else {
          console.error('Echec de l\'enregistrement...');
        }
      })
    ).subscribe();
  }

  getFormControlErrorText(cntrl: AbstractControl) {
    if (cntrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (cntrl.hasError('email')) {
      return 'veuillez renseignez un format d\'email correct';
    } else if (cntrl.hasError('pattern')) {
      return 'Ce format de numéro de téléphone n\'est pas pris en compte';
    } else if (cntrl.hasError('minlength')) {
      return 'Nom d\'utilisateur trop court';
    } else if (cntrl.hasError('maxlength')) {
      return 'Nom d\'utilisateur trop long';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
}
