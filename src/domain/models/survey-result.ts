export interface SurveyResultData {
  surveyId: string
  accountId: string
  answer: string
  date: Date
}

export interface SurveyResultModel extends SurveyResultData {
  id: string
}
