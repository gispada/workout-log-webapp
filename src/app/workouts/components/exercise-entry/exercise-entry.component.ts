import { Component, Input } from '@angular/core'

@Component({
  selector: 'workouts-exercise-entry',
  templateUrl: './exercise-entry.component.html',
  styleUrls: ['./exercise-entry.component.scss']
})
export class ExerciseEntryComponent {
  @Input() exercise: any
  @Input() interactive = false

  get isSequence() {
    return this.exercise.type === 'sequence'
  }

  get numberOfSets() {
    const [{ sets }] = this.exercise.exercises || [{}]
    return sets?.length * 2
  }
}
