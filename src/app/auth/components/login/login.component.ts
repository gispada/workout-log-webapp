import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { SIGNIN, SIGNUP } from '@config/routes'
import { userActions } from '@state/user'
import { appSelectors } from '@state/app'
import { first } from '@shared/utils'

const { emailAndPasswordLogin, emailAndPasswordRegistration } = userActions

const passwordsMatchValidator: ValidatorFn = (control) => {
  const password = control.value
  const passwordToMatch = control.parent?.get('password')?.value
  return password === passwordToMatch ? null : { confirmPasswords: true }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup
  passwordVisible = false
  isSignup = first(this.route.snapshot.url)?.path === SIGNUP
  translationNs = this.isSignup ? 'Registration.' : 'Login.'
  secondaryButtonLink = this.isSignup ? SIGNIN : SIGNUP

  loading$ = this.store.select(appSelectors.selectLoadingStatus('auth'))

  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        ...(this.isSignup && {
          confirmPassword: [null, [Validators.required, passwordsMatchValidator]]
        })
      },
      { updateOn: 'blur' }
    )
  }

  validateConfirmPassword() {
    if (this.isSignup) {
      this.validateForm.controls['confirmPassword'].updateValueAndValidity()
    }
  }

  displayErrors() {
    for (const control of Object.values(this.validateForm.controls)) {
      if (control.invalid) {
        control.markAsDirty()
        control.updateValueAndValidity({ onlySelf: true })
      }
    }
  }

  submitForm() {
    if (this.validateForm.valid) {
      const payload = {
        email: <string>this.validateForm.get('email')!.value,
        password: <string>this.validateForm.get('password')!.value
      }
      const action = this.isSignup ? emailAndPasswordRegistration : emailAndPasswordLogin
      this.store.dispatch(action(payload))
    } else {
      this.displayErrors()
    }
  }
}
