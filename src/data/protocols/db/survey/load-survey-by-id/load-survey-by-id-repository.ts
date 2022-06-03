import { SurveyModel } from '../../../../../domain/models/surveys'

export interface SurveyModelRepo extends SurveyModel { }

export interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModelRepo | null>
}
