import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SIGNIN, SIGNUP, EMAIL_CONFIRM, GOOGLE_REDIRECT } from '@config/routes'
import {
  ConfirmUserComponent,
  GoogleRedirectComponent,
  LoginComponent
} from './components'
import { UserNotLoggedInGuard } from './guards'

const routes: Routes = [
  {
    path: SIGNIN,
    component: LoginComponent,
    canActivate: [UserNotLoggedInGuard]
  },
  {
    path: SIGNUP,
    component: LoginComponent,
    canActivate: [UserNotLoggedInGuard]
  },
  {
    path: EMAIL_CONFIRM,
    component: ConfirmUserComponent,
    canActivate: [UserNotLoggedInGuard]
  },
  {
    path: GOOGLE_REDIRECT,
    component: GoogleRedirectComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})
export class AuthRoutingModule {}
