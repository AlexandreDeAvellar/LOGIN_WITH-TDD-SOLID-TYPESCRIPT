export interface Answer {
  image: string
  answer: string
}

export interface AddSurvey {
  question: string
  answers: Answer[]
}

export interface Survey {
  add: (data: AddSurvey) => Promise<null>
}
