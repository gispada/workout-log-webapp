import { Injectable } from '@angular/core'
import { TagsApiService } from '@core/services'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { assert } from '@shared/utils/miscellaneous'
import { exhaustMap, map, switchMap } from 'rxjs'
import {
  draftTagDelete,
  removeCategoryFromTags,
  selectedTagsDelete,
  selectedTagsDeleteSuccess,
  tagDeleteSuccess,
  tagSave,
  tagSaveSuccess,
  tagsFetch,
  tagsFetchSuccess
} from './tags.actions'
import { selectDraft, selectSelectedTags } from './tags.selectors'

@Injectable()
export class TagsEffects {
  fetchTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tagsFetch),
      switchMap(() => this.tagsApi.getAll()),
      map(tagsFetchSuccess)
    )
  })

  saveTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tagSave),
      concatLatestFrom(() => this.store.select(selectDraft)),
      exhaustMap(([, tag]) => {
        assert(tag, 'Can not save an uninitialized draft')
        return '_id' in tag ? this.tagsApi.update(tag._id, tag) : this.tagsApi.create(tag)
      }),
      map(tagSaveSuccess)
    )
  })

  removeDeletedCategoryFromTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeCategoryFromTags),
      exhaustMap(({ payload }) =>
        this.tagsApi
          .updateMany({ category: payload }, { $unset: { category: '' } })
          .pipe(map(() => payload))
      ),
      map(tagDeleteSuccess)
    )
  })

  deleteDraftTag$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(draftTagDelete),
      concatLatestFrom(() => this.store.select(selectDraft)),
      exhaustMap(([, tag]) => {
        assert(tag && '_id' in tag, 'Can not delete a tag without ID')
        return this.tagsApi.delete(tag._id).pipe(map(() => tag))
      }),
      map(({ type, _id }) =>
        type === 'category' ? removeCategoryFromTags(_id) : tagDeleteSuccess(_id)
      )
    )
  })

  deleteSelectedTags = createEffect(() => {
    return this.actions$.pipe(
      ofType(selectedTagsDelete),
      concatLatestFrom(() => this.store.select(selectSelectedTags)),
      exhaustMap(([, selected]) => this.tagsApi.delete(selected)),
      map(selectedTagsDeleteSuccess)
    )
  })

  refreshTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tagSaveSuccess, tagDeleteSuccess, selectedTagsDeleteSuccess),
      map(tagsFetch)
    )
  })

  constructor(
    private actions$: Actions,
    private store: Store,
    private tagsApi: TagsApiService
  ) {}
}
