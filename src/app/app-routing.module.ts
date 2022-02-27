import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserLoggedInGuard } from '@auth/guards'
import { HOME } from '@config/routes'
import { DashboardComponent } from '@dashboard/dashboard.component'

const routes: Routes = [
  {
    path: HOME,
    component: DashboardComponent,
    canActivate: [UserLoggedInGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
