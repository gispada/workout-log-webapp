import { BSON } from 'realm-web'
import { from, map } from 'rxjs'
import { Collection, DocumentWithObjectId } from '@core/types/api'
import { NewEntity } from '@state/types'
import { Dictionary } from '@shared/types'
import { RealmService } from './realm.service'

type BaseCrudEntity = DocumentWithObjectId & { ownerId: string }

export class ApiCrudService<T extends BaseCrudEntity> {
  constructor(private realm: RealmService, private collectionName: Collection) {}

  private processObjectId(document: T) {
    return { ...document, _id: document._id.toString() } as T
  }

  getAll() {
    return from(this.realm.find<T>(this.collectionName)).pipe(
      map((documents) => documents.map(this.processObjectId))
    )
  }

  getById(id: string) {
    const objectId = new BSON.ObjectId(id)
    return from(this.realm.findOne<T>(this.collectionName, { _id: objectId })).pipe(
      map((document) => (document ? this.processObjectId(document) : null))
    )
  }

  create(document: NewEntity<T>) {
    const newDocument = { ...document, ownerId: this.realm.app.currentUser!.id }
    return from(this.realm.insertOne(this.collectionName, newDocument)).pipe(
      map(({ insertedId }) => ({ ...newDocument, _id: insertedId.toString() } as T))
    )
  }

  update(id: string, document: T) {
    const objectId = new BSON.ObjectId(id)
    return from(
      this.realm.replaceOne(
        this.collectionName,
        { _id: objectId },
        { ...document, _id: objectId }
      )
    ).pipe(map((result) => (result ? document : null)))
  }

  updateMany(filter: Dictionary<string | number>, update: Dictionary<any>) {
    return from(this.realm.updateMany(this.collectionName, filter, update))
  }

  delete(ids: string | string[]) {
    if (Array.isArray(ids)) {
      const objectIds = ids.map((id) => new BSON.ObjectId(id))
      return from(this.realm.deleteMany(this.collectionName, { _id: { $in: objectIds } }))
    }

    return from(
      this.realm.deleteOne(this.collectionName, { _id: new BSON.ObjectId(ids) })
    )
  }
}
