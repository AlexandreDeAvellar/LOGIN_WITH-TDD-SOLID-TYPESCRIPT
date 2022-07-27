import { SurveyResultData, SurveyResultModel } from '../models/survey-result'

export interface SaveSurveyResult {
  save: (data: SurveyResultData) => Promise<SurveyResultModel | null>
}
