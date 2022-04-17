import { Component, Input } from '@angular/core'

@Component({
  selector: 'workouts-workout-card',
  templateUrl: './workout-card.component.html',
  styleUrls: ['./workout-card.component.scss']
})
export class WorkoutCardComponent {
  @Input() name!: string
  @Input() description?: string
  @Input() imageUrl?: string
  @Input() tags?: string[]
}
