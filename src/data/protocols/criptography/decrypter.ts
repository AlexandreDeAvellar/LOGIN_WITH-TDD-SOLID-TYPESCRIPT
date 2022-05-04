
export interface Decrypter {
  decrypt: (accountToken: string) => Promise<string>
}
