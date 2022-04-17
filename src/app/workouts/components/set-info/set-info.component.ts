import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

// Temp
type Set = {
  kind: 'reps' | 'time'
  value: number
  intensity?: number
}

@Component({
  selector: 'workouts-set-info',
  templateUrl: './set-info.component.html',
  styleUrls: ['./set-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetInfoComponent {
  @Input() set?: Set
  @Input() number?: number

  getValue() {
    const { value, kind } = this.set!
    //return value
    return `${value} ${kind === 'reps' ? 'reps' : 'sec'}`
  }
}
