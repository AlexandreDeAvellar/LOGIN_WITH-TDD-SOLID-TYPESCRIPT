import { SaveSurveyResult, SaveSurveyResultRepository, SurveyResultData, SurveyResultModelRepo } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (data: SurveyResultData): Promise<SurveyResultModelRepo> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
