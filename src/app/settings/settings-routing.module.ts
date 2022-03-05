import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SETTINGS, EXERCISE_NEW, EXERCISE_DETAIL } from '@config/routes'
import { SettingsComponent } from './settings.component'
import { ExerciseDetailComponent, SettingsTabsComponent } from './components'

const routes: Routes = [
  {
    path: SETTINGS,
    component: SettingsComponent,
    children: [
      {
        path: '',
        component: SettingsTabsComponent
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
