import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserLoggedInGuard } from '@auth/guards'
import { WORKOUTS, WORKOUT_DETAIL, WORKOUT_NEW } from '@config/routes'
import { AppWorkoutsComponent } from './workouts.component'
import { WorkoutDetailComponent, WorkoutsListComponent } from './components'

const routes: Routes = [
  {
    path: WORKOUTS,
    component: AppWorkoutsComponent,
    // canActivate: [UserLoggedInGuard],
    children: [
      {
        path: '',
        component: WorkoutsListComponent
      },
      {
        path: WORKOUT_NEW,
        component: WorkoutDetailComponent
      } /*
      {
        path: WORKOUT_DETAIL,
        component: WorkoutDetailComponent
      } */
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class WorkoutsRoutingModule {}
