export default interface LogErrorRepositoryProtocol {
  log: (stack: string) => Promise<void>
}