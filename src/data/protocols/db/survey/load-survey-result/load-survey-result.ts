import { SurveyResultModelRepo } from '../save-survey-result/save-survey-result-repository'

export interface LoadSurveyResultRepository {
  load: (surveyId: string) => Promise<SurveyResultModelRepo>
}
