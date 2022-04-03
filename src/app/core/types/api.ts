import type { BSON } from 'realm-web'

type BaseError = {
  method: string
  url: string
  statusText: string
  statusCode: number
}

export type Credentials = {
  email: string
  password: string
}

export type EmailConfirmParams = {
  token: string
  tokenId: string
}

export type AuthenticationError = BaseError & {
  error: string
  errorCode: string
}

export type Collection = 'exercises' | 'tags'

export type MongoDBFilter = Realm.Services.MongoDB.Filter

export type MongoDBUpdate = Realm.Services.MongoDB.Update

export type DocumentWithObjectId = Realm.Services.MongoDB.Document<BSON.ObjectId | string>

// The following utils are not used

/**
 * Changes every property in T that is of type `ObjectId` to string.
 */
export type WithStringId<T> = {
  [K in keyof T]: T[K] extends BSON.ObjectId ? string : T[K]
}

/**
 * Changes the type of the `_id` property in T to `ObjectId`.
 */
export type WithObjectId<T> = {
  [K in keyof T]: K extends '_id' ? BSON.ObjectId : T[K]
}
