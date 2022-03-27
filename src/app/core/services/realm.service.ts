import { Injectable } from '@angular/core'
import { App as RealmApp, Credentials as RealmCredentials } from 'realm-web'
import { GOOGLE_REDIRECT } from '@config/routes'
import {
  Credentials,
  DocumentWithObjectId,
  EmailConfirmParams,
  MongoDBFilter
} from '../types/api'

const REALM_APP_ID = process.env['REALM_APP_ID']!
const DATABASE_NAME = process.env['MONGO_DB_NAME']!
const BASE_URL = process.env['BASE_URL']!

@Injectable({
  providedIn: 'root'
})
export class RealmService {
  app = new RealmApp({ id: REALM_APP_ID })
  db = this.getDbInstance()

  private getDbInstance() {
    return this.app.currentUser?.mongoClient('mongodb-atlas').db(DATABASE_NAME)
  }

  private initDb() {
    if (this.db) return
    this.db = this.getDbInstance()
  }

  async loginWithEmailAndPassword({ email, password }: Credentials) {
    const credentials = RealmCredentials.emailPassword(email, password)
    const user = await this.app.logIn(credentials)
    this.initDb()
    return user
  }

  registerWithEmailAndPassword(credentials: Credentials) {
    return this.app.emailPasswordAuth.registerUser(credentials)
  }

  confirmUser(params: EmailConfirmParams) {
    return this.app.emailPasswordAuth.confirmUser(params)
  }

  async loginWithGoogle() {
    const credentials = RealmCredentials.google(`${BASE_URL}/${GOOGLE_REDIRECT}`)
    const user = await this.app.logIn(credentials)
    this.initDb()
    return user
  }

  logout() {
    return this.app.currentUser?.logOut()
  }

  findOne<T extends DocumentWithObjectId>(collection: string, filter: MongoDBFilter) {
    return this.db!.collection<T>(collection).findOne(filter)
  }

  find<T extends DocumentWithObjectId>(collection: string, filter?: MongoDBFilter) {
    return this.db!.collection<T>(collection).find(filter)
  }

  watchCollection<T extends DocumentWithObjectId>(collection: string) {
    return this.db!.collection<T>(collection).watch()
  }

  insertOne<T extends DocumentWithObjectId>(
    collection: string,
    document: Realm.Services.MongoDB.NewDocument<T>
  ) {
    return this.db!.collection<T>(collection).insertOne(document)
  }

  replaceOne<T extends DocumentWithObjectId>(
    collection: string,
    filter: MongoDBFilter,
    document: T
  ) {
    return this.db!.collection<T>(collection).findOneAndReplace(filter, document)
  }

  deleteOne<T extends DocumentWithObjectId>(collection: string, filter: MongoDBFilter) {
    return this.db!.collection<T>(collection).deleteOne(filter)
  }

  deleteMany<T extends DocumentWithObjectId>(collection: string, filter: MongoDBFilter) {
    return this.db!.collection<T>(collection).deleteMany(filter)
  }
}
