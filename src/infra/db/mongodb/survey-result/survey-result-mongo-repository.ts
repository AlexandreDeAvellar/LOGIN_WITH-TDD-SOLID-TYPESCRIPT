import { ObjectId } from 'mongodb'
import { MongoHelper, SaveSurveyResultRepository, SurveyResultDataRepo, SurveyResultModelRepo } from './survey-result-mongo-repository-protocols'
import { QueryBuilder } from '../helpers/query-builder/query-builder'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SurveyResultDataRepo): Promise<SurveyResultModelRepo | null> {
    const { accountId, answer, date, surveyId } = data
    const surveyResultsCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultsCollection.findOneAndUpdate(
      { accountId, surveyId }, { $set: { answer, date } }, { upsert: true }
    )
    const surveyResult = await this.loadBySurveyId(surveyId)
    return surveyResult
  }

  private async loadBySurveyId (surveyId: string): Promise<SurveyResultModelRepo | null> {
    const surveyResultsCollection = await MongoHelper.getCollection('surveyResults')
    const query = new QueryBuilder()
      .addFields({
        surveyId: { $toObjectId: '$surveyId' }
      })
      .match({ surveyId: new ObjectId(surveyId) })
      .group({
        _id: 0,
        data: { $push: '$$ROOT' },
        count: { $sum: 1 }
      })
      .unwind({ path: '$data' })
      .lookup({
        from: 'surveys',
        localField: 'data.surveyId',
        foreignField: '_id',
        as: 'survey'
      })
      .unwind({ path: '$survey' })
      .group({
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: '$survey.date',
          total: '$count',
          answer: {
            $filter: {
              input: '$survey.answers',
              as: 'item',
              cond: { $eq: ['$$item.answer', '$data.answer'] }
            }
          }
        },
        count: { $sum: 1 }
      })
      .unwind({ path: '$_id.answer' })
      .addFields({
        '_id.answer.count': '$count',
        '_id.answer.percent': {
          $multiply: [
            { $divide: ['$count', '$_id.total'] }, 100
          ]
        }
      })
      .group({
        _id: {
          surveyId: '$_id.surveyId',
          question: '$_id.question',
          date: '$_id.date'
        },
        answers: {
          $push: '$_id.answer'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers'
      })
      .build()

    const surveyResult: any[] = await surveyResultsCollection.aggregate(query).toArray()
    return surveyResult.length ? surveyResult[0] : null
  }
}
