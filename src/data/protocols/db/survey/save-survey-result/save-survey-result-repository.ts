import { SurveyResultData, SurveyResultModel, SurveyResultAnswerModel } from '../../../../../domain/models/survey-result'

export interface SurveyResultDataRepo extends SurveyResultData {}
export interface SurveyResultModelRepo extends SurveyResultModel {}
export interface SurveyResultAnswerModelRepo extends SurveyResultAnswerModel {}

export interface SaveSurveyResultRepository {
  save: (data: SurveyResultDataRepo) => Promise<void>
}
