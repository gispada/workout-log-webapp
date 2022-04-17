import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { WORKOUTS } from '@config/routes'

@Component({
  selector: 'workouts-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent {
  parentUrl = WORKOUTS
  workoutId = this.route.snapshot.paramMap.get('id')
  tagsModalVisible = false

  exercises = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  addTags(ids: string[]) {
    // this.store.dispatch()
  }

  cancel() {
    this.router.navigateByUrl(`/${this.parentUrl}`)
  }
}
