import { SaveSurveyResult, SaveSurveyResultRepository, SurveyResultData, SurveyResultModelRepo, LoadSurveyResultRepository } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save (data: SurveyResultData): Promise<SurveyResultModelRepo | null> {
    const { surveyId } = data
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return surveyResult
  }
}
