import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { SETTINGS } from '@config/routes'

@Component({
  selector: 'app-settings-exercise',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss']
})
export class ExerciseDetailComponent {
  parentUrl = SETTINGS
  ns = 'Settings.Exercises.'
  exerciseId = this.route.snapshot.paramMap.get('id')
  isNew = !this.exerciseId

  personalRecords = [
    {
      date: '24/03/2021',
      value: 90,
      unit: 'kg'
    },
    {
      date: '14/05/2021',
      value: 100,
      unit: 'kg'
    }
  ]

  constructor(public translate: TranslateModule, private route: ActivatedRoute) {}

  onPrDelete(pr: any) {
    console.log(pr)
  }

  onPrAdd() {
    console.log('Add new')
  }
}
