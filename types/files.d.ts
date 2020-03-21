type OpenMode = 'r' | 'w' | 'a' | 'rw'

interface TextFile {
  close(): void
}

interface ReadableTextFile extends TextFile {
  read(): string
  read(maxCount: number): string
  readline(): string
  readlines(): string[]
}
interface WritableTextFile {
  write(text: string): void
  writeline(text: string): void
  writelines(lines: string[]): void
  flush(): void
}

declare namespace files {
  function isFile(path: string): boolean
  function isDir(path: string): boolean
  function isEmptyDir(path: string): boolean
  function join(parent: string, child: string): string
  function create(path: string): boolean
  function createWithDirs(path: string): boolean
  function exists(path: string): boolean
  function ensureDir(path: string): void
  function read(path: string, encoding?: string): string
  function readBytes(path: string): number[]
  function write(path: string, text: string, encoding?: string): void
  function writeBytes(path: string, bytes: number[]): void
  function append(path: string, text: string, encoding?: string): void
  function appendBytes(path: string, bytes: number[], encoding?: string): void
  function copy(fromPath: string, toPath: string): boolean
  function move(fromPath: string, toPath: string): boolean
  function rename(path: string, newName: string): boolean
  function renameWithoutExtension(path: string, newName: string): boolean
  function getName(path: string): string
  function getNameWithoutExtension(path: string): string
  function getExtension(path: string): string
  /** 删除文件或空目录 */
  function remove(path: string): boolean
  /** 删除整个目录包含目录内的内容 */
  function removeDir(path: string): boolean
  function getSdcardPath(): string
  function cwd(): string | null
  function path(relativePath: string): string
  function listDir(path: string, filter?: (fileName: string) => boolean): string[]
  function open(path: 'string', mode?: OpenMode, encoding?: string, bufferSize?: number): TextFile
}
