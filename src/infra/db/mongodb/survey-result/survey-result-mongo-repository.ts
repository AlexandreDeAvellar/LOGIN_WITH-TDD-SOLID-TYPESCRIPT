import { MongoHelper, SaveSurveyResultRepository, SurveyResultDataRepo, SurveyResultModelRepo } from './survey-result-mongo-repository-protocols'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SurveyResultDataRepo): Promise<SurveyResultModelRepo> {
    const { accountId, answer, date, surveyId } = data
    const surveyResultsCollection = await MongoHelper.getCollection('surveyResults')
    const surveyResultModel = await surveyResultsCollection.findOneAndUpdate(
      { accountId, surveyId }, { $set: { answer, date } }, { upsert: true, returnDocument: 'after' }
    )
    return MongoHelper.map(surveyResultModel.value)
  }
}
