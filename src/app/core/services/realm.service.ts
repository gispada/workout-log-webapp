import { Injectable } from '@angular/core'
import * as RealmSDK from 'realm-web'
import { Credentials, EmailConfirmParams } from '../types/api'

const REALM_APP_ID = process.env['REALM_APP_ID']!
const DATABASE_NAME = process.env['MONGO_DB_NAME']!

type MongoDBDocument = Realm.Services.MongoDB.Document

@Injectable({
  providedIn: 'root'
})
export class RealmService {
  app = new RealmSDK.App({ id: REALM_APP_ID })
  db = this.app.currentUser?.mongoClient('mongodb-atlas').db(DATABASE_NAME) // TODO: work in progress

  loginWithEmailAndPassword({ email, password }: Credentials) {
    const credentials = RealmSDK.Credentials.emailPassword(email, password)
    return this.app.logIn(credentials)
  }

  registerWithEmailAndPassword(credentials: Credentials) {
    return this.app.emailPasswordAuth.registerUser(credentials)
  }

  confirmUser(params: EmailConfirmParams) {
    return this.app.emailPasswordAuth.confirmUser(params)
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
