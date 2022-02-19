export default interface LogErrorRepositoryProtocol {
  logError: (stack: string) => Promise<void>
}
