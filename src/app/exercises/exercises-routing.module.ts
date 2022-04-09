import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserLoggedInGuard } from '@auth/guards'
import { EXERCISE_NEW, EXERCISE_DETAIL, EXERCISES } from '@config/routes'
import { ExerciseDetailComponent, ExercisesListComponent } from './components'
import { AppExercisesComponent } from './exercises.component'

const routes: Routes = [
  {
    path: EXERCISES,
    component: AppExercisesComponent,
    canActivate: [UserLoggedInGuard],
    children: [
      {
        path: '',
        component: ExercisesListComponent
      },
      {
        path: EXERCISE_NEW,
        component: ExerciseDetailComponent
      },
      {
        path: EXERCISE_DETAIL,
        component: ExerciseDetailComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
