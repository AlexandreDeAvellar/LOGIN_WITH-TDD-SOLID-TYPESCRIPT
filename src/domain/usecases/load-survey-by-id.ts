import { SurveyModel } from '../models/surveys'

export interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel | null>
}
