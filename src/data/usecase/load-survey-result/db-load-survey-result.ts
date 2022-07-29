import { LoadSurveyResult, LoadSurveyResultRepository, SurveyResultModel, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly LoadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      const survey = await this.LoadSurveyByIdRepository.loadById(surveyId)
      if (survey) {
        const { id, date, question, answers } = survey
        surveyResult = { surveyId: id, date, question, answers: [{ ...answers[0], count: 0, percent: 0 }] }
      }
      return { answers: [{ answer: '', count: 0, percent: 0, image: '' }], date: new Date(), question: '', surveyId: '' }
    }

    return surveyResult
  }
}
