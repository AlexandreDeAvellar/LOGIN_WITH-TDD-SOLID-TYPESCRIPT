export interface HashComparer {
  compare: (value: string, hahs: string) => Promise<boolean>
}
