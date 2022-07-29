import { SurveyResultModelRepo } from '../save-survey-result/save-survey-result-repository'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string) => Promise<SurveyResultModelRepo | null>
}
