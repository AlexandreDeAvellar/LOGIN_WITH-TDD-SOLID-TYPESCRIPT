import { SurveyResultData, SurveyResultModel } from '../../../../../domain/models/survey-result'

export interface SurveyResultDataRepo extends SurveyResultData {}
export interface SurveyResultModelRepo extends SurveyResultModel {}

export interface SaveSurveyResultRepository {
  save: (data: SurveyResultDataRepo) => Promise<SurveyResultModel>
}
