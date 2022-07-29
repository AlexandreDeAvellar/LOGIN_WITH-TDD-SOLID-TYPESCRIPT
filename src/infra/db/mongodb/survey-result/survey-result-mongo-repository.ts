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
        total: { $sum: 1 }
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
          total: '$total',
          answer: '$data.answer',
          answers: '$survey.answers'
        },
        count: { $sum: 1 }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: {
          $map: {
            input: '$_id.answers',
            as: 'item',
            in: {
              $mergeObjects: [
                '$$item',
                {
                  count: {
                    $cond: {
                      if: { $eq: ['$$item.answer', '$_id.answer'] },
                      then: '$count',
                      else: 0

                    }
                  },
                  percent: {
                    $cond: {
                      if: { $eq: ['$$item.answer', '$_id.answer'] },
                      then: {
                        $multiply: [
                          { $divide: ['$count', '$_id.total'] },
                          100
                        ]
                      },
                      else: 0

                    }
                  }
                }
              ]
            }
          }
        }
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date'
        },
        answers: {
          $push: '$answers'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: {
          $reduce: {
            input: '$answers',
            initialValue: [],
            in: {
              $concatArrays: ['$$value', '$$this']
            }
          }
        }
      })
      .unwind({ path: '$answers' })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date',
          answer: '$answers.answer',
          image: '$answers.image'
        },
        count: {
          $sum: '$answers.count'
        },
        percent: {
          $sum: '$answers.percent'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answer: {
          answer: '$_id.answer',
          image: '$_id.image',
          count: '$count',
          percent: '$percent'
        }
      })
      .sort({ 'answer.count': -1 })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date'
        },
        answers: {
          $push: '$answer'
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
