import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from '@auth/components'
import { SIGNIN, SIGNUP } from '@config/routes'

const routes: Routes = [
  {
    path: SIGNIN,
    component: LoginComponent
  },
  {
    path: SIGNUP,
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
