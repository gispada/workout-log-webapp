import { Injectable } from '@angular/core'
import { App as RealmApp, Credentials as RealmCredentials } from 'realm-web'
import { GOOGLE_REDIRECT } from '@config/routes'
import { Credentials, EmailConfirmParams } from '../types/api'

const REALM_APP_ID = process.env['REALM_APP_ID']!
const DATABASE_NAME = process.env['MONGO_DB_NAME']!
const BASE_URL = process.env['BASE_URL']!

type MongoDBDocument = Realm.Services.MongoDB.Document

@Injectable({
  providedIn: 'root'
})
export class RealmService {
  app = new RealmApp({ id: REALM_APP_ID })
  db = this.app.currentUser?.mongoClient('mongodb-atlas').db(DATABASE_NAME) // TODO: work in progress

  loginWithEmailAndPassword({ email, password }: Credentials) {
    const credentials = RealmCredentials.emailPassword(email, password)
    return this.app.logIn(credentials)
  }

  registerWithEmailAndPassword(credentials: Credentials) {
    return this.app.emailPasswordAuth.registerUser(credentials)
  }

  confirmUser(params: EmailConfirmParams) {
    return this.app.emailPasswordAuth.confirmUser(params)
  }

  loginWithGoogle() {
    const credentials = RealmCredentials.google(`${BASE_URL}/${GOOGLE_REDIRECT}`)
    return this.app.logIn(credentials)
  }

  logout() {
    return this.app.currentUser?.logOut()
  }

  findOne<T extends MongoDBDocument>(
    collection: string,
    filter: Realm.Services.MongoDB.Filter
  ) {
    return this.db!.collection<T>(collection).findOne(filter)
  }

  find<T extends MongoDBDocument>(
    collection: string,
    filter?: Realm.Services.MongoDB.Filter
  ) {
    return this.db!.collection<T>(collection).find(filter)
  }

  watchCollection<T extends MongoDBDocument>(collection: string) {
    return this.db!.collection<T>(collection).watch()
  }
}
