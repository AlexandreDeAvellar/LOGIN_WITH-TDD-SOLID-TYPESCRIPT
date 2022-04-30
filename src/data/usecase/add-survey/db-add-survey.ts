import { AddSurvey, AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocol'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}
  async add (data: AddSurveyModel): Promise<void> {
    try {
      await this.addSurveyRepository.add(data)
    } catch (error) {
      throw new Error()
    }
  }
}
