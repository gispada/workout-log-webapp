import { Injectable } from '@angular/core'
import { Exercise } from '@state/exercises'
import { TagEntity } from '@state/tags'
import { ApiCrudService } from './crud.service'
import { RealmService } from './realm.service'

@Injectable({
  providedIn: 'root'
})
export class ExercisesApiService extends ApiCrudService<Exercise> {
  constructor(realm: RealmService) {
    super(realm, 'exercises')
  }
}

@Injectable({
  providedIn: 'root'
})
export class TagsApiService extends ApiCrudService<TagEntity> {
  constructor(realm: RealmService) {
    super(realm, 'tags')
  }
}
