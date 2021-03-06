import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository, AddSurveyModel, SurveyAnswerModel } from './db-add-survey-protocol'
import MockDate from 'mockdate'

const makeFakeAnswer = (): SurveyAnswerModel => {
  return {
    image: 'any_image',
    answer: 'any_answer'
  }
}

const makeFakeAddSurveyModel = (): AddSurveyModel => {
  return {
    question: 'any_question',
    answers: [makeFakeAnswer()],
    date: new Date()
  }
}

const makeAddSurveyRepositoryStub = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyModel): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeAddSurveyModel())
    expect(addSpy).toHaveBeenCalledWith(makeFakeAddSurveyModel())
  })

  test('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAddSurveyModel())
    await expect(promise).rejects.toThrow()
  })
})
