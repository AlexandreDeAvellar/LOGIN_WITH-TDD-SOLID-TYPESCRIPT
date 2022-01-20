import LogErrorRepositoryProtocol from '../../../../data/protocols/db/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepositoryProtocol {
  async logError (stack: string): Promise<void> {
    const collectionError = await MongoHelper.getCollection('errors')
    await collectionError.insertOne({
      stack,
      date: new Date()
    })
    return await new Promise(resolve => resolve())
  }
}
