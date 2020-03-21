declare namespace storages {
  function create(name: string): Storage
  function remove(name: string): boolean
}

interface Storage {
  put(key: string, value: any): void
  get(key: string, defaultValue?: any): any
  remove(key: string): void
  contains(key: string): boolean
  clear(): void
}
