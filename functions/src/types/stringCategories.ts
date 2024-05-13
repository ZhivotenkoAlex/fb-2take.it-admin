interface Strings {
  name: string
  value: string
}

export interface StringCategories {
  _id: string
  id: string
  languageId: string
  name: string
  userId: string
  strings: Strings[]
}
