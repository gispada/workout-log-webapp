import { Component } from '@angular/core'
import { WORKOUT_NEW } from '@config/routes'

@Component({
  selector: 'workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss']
})
export class WorkoutsListComponent {
  newWorkoutUrl = WORKOUT_NEW

  workouts = [
    {
      name: 'Test',
      id: '1',
      description: 'Lorem ipsum',
      imageUrl: '',
      tags: []
    }
  ]
}
