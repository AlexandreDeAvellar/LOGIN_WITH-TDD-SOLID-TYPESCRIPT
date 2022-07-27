import { SaveSurveyResultRepository, SurveyResultDataRepo, SurveyResultModelRepo, SurveyResultAnswerModelRepo } from './db-save-survey-result-protocols'

export const makeFakeSurveyResultDataRepo = (): SurveyResultDataRepo => (
  { accountId: 'any_accountID', surveyId: '62d5faccb449d79106503bd4', date: new Date(), answer: 'any_answer' }
)

export const makeSurveyResultAnswerModel = (): SurveyResultAnswerModelRepo[] => ([
  { image: 'any_image', answer: 'any_answer', count: 1, percent: 50 },
  { image: 'other_image', answer: 'other_answer', count: 12, percent: 50 }
])

export const makeFakeSurveyResultModelRepo = (): SurveyResultModelRepo => (
  { surveyId: 'any_surveyID', question: 'any_question', date: new Date(), answers: makeSurveyResultAnswerModel() }
)

export const makeSaveSurveyResultRepositoryStub = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SurveyResultDataRepo): Promise<SurveyResultModelRepo> {
      return await new Promise(resolve => resolve(makeFakeSurveyResultModelRepo()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
