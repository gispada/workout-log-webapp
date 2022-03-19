import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs'
import type { NgForm } from '@angular/forms'
import { EXERCISES } from '@config/routes'
import { exercisesActions, exercisesSelectors } from '@state/exercises'
import { displayInvalidFormControls } from '@shared/utils/miscellaneous'
import { Dictionary } from '@shared/types'
import { AppConfig, APP_CONFIG } from '@config/app'
import type { ExerciseSimpleProps } from '@state/exercises/exercises.actions'

const { exerciseNew, exerciseTagRemoved, exerciseTagsAdded, exercisePropertyChanged } =
  exercisesActions

@Component({
  selector: 'exercises-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseDetailComponent implements OnInit {
  parentUrl = EXERCISES
  exerciseId = this.route.snapshot.paramMap.get('id')
  modalVisible = false

  translatedUnitOfMeasures$ = this.translate.stream(this.splitUnitsOfMeasure()).pipe(
    map((translations: Dictionary<string>) =>
      this.appConfig.unitOfMeasure.map((value) => {
        const [type, symbol] = value.split(':')
        const translatedType = translations[this.addUomNamespace(type)]
        const translatedSymbol = translations[this.addUomNamespace(symbol)]
        return { value, label: `${translatedSymbol} (${translatedType.toLowerCase()})` }
      })
    )
  )

  draft$ = this.store.select(exercisesSelectors.selectDraft)

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    if (!this.exerciseId) {
      this.store.dispatch(exerciseNew())
    }
  }

  addUomNamespace(x: string) {
    return `Exercises.UnitsOfMeasure.${x}`
  }

  // From ['uomType:uomSymbol'] to ['uomType', 'uomSymbol'], ready to be translated
  splitUnitsOfMeasure() {
    const unitsOfMeasureSet = new Set<string>()
    for (const uom of this.appConfig.unitOfMeasure) {
      const [type, symbol] = uom.split(':')
      unitsOfMeasureSet.add(type).add(symbol)
    }
    return [...unitsOfMeasureSet].map(this.addUomNamespace)
  }

  onChange(id: keyof ExerciseSimpleProps, value: string) {
    this.store.dispatch(exercisePropertyChanged({ [id]: value }))
  }

  addTags(ids: string[]) {
    this.store.dispatch(exerciseTagsAdded(ids))
  }

  deleteTag(id: string) {
    this.store.dispatch(exerciseTagRemoved(id))
  }

  saveDraft(form: NgForm) {
    if (!form.valid) {
      return displayInvalidFormControls(form.controls)
    }

    console.log('SAVE')
  }
}
