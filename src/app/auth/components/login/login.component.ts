import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup
  passwordVisible = false

  constructor(public translate: TranslateService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [
        null,
        [Validators.compose([Validators.required, Validators.minLength(6)])]
      ]
    })
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
      console.log('submit', this.validateForm.value)
    } else {
      this.displayErrors()
    }
  }
}
