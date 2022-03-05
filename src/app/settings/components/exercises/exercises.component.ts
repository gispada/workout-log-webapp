import { Component } from '@angular/core'
import { EXERCISE_NEW } from '@config/routes'
import { TranslateModule } from '@ngx-translate/core'

type Exercise = {
  name: string
  description: string
}
@Component({
  selector: 'app-settings-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  newExerciseUrl = EXERCISE_NEW
  ns = 'Settings.Exercises.'

  columns = [
    { dataKey: 'name', title: 'Exercise' },
    { dataKey: 'description', title: 'Description' },
    { dataKey: 'tags', title: 'Tags' }
  ]
  dataSource: Exercise[] = [
    {
      name: 'Squat',
      description: 'Lorem ipsum'
    },
    {
      name: 'Bench press',
      description: 'Lorem ipsum'
    },
    {
      name: 'Lat machine',
      description: 'Lorem ipsum'
    },
    {
      name: 'Bent over row',
      description: 'Lorem ipsum'
    },
    {
      name: 'Deadlift',
      description: 'Lorem ipsum'
    },
    {
      name: 'Military press',
      description: 'Lorem ipsum'
    },
    {
      name: 'T-bar row',
      description: 'Lorem ipsum'
    }
  ]

  constructor(public translate: TranslateModule) {}
}
