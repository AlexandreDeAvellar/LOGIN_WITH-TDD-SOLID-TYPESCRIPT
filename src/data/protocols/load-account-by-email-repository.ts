export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<string>
}
