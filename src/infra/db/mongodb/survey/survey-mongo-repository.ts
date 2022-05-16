import { AddSurveyModel, AddSurveyRepository, LoadSurveysRepository, MongoHelper, SurveyModel } from './survey-mongo-repository-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey: SurveyModel[] = (await surveyCollection.find().toArray()).map(MongoHelper.map)
    return survey
  }
}
