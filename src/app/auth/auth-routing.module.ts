import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SIGNIN, SIGNUP, EMAIL_CONFIRM } from '@config/routes'
import { ConfirmUserComponent, LoginComponent } from './components'

const routes: Routes = [
  {
    path: SIGNIN,
    component: LoginComponent
  },
  {
    path: SIGNUP,
    component: LoginComponent
  },
  {
    path: EMAIL_CONFIRM,
    component: ConfirmUserComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})
export class AuthRoutingModule {}
