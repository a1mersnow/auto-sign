type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface BufferedSink {}

interface RequestOptions {
  headers: {
    [h: string]: string
  };
  methods: HttpMethod;
  contentType: string;
  body: number[] | string | ((x: BufferedSink) => any);
}

interface Body {
  string(): string
  json(): object
  bytes(): number[],
  contentType: string
}

interface Request {
  url: string,
  method: HttpMethod
}

interface Response {
  statusCode: number
  statusMessage: string
  headers: object,
  body: Body,
  request: Request
}

type fileName = string
type filePath = string
type mimeType = string
interface MultipartFormData {
  [name: string]: string | TextFile | [fileName, filePath] | [fileName, mimeType, filePath]
}

declare namespace http {
  function get(url: string, options?: Partial<RequestOptions>): Response[]
  function get(url: string, options?: Partial<RequestOptions>, callback?: (rs: Response[]) => void): void
  function post(url: string, data: string | object, options?: Partial<RequestOptions>): Response[]
  function post(url: string, data: string | object, options?: Partial<RequestOptions>, callback?: (rs: Response[]) => void): void
  function postJson(url: string, data: object, options?: Partial<RequestOptions>): Response[]
  function postJson(url: string, data: object, options?: Partial<RequestOptions>, callback?: (rs: Response[]) => void): void
  function postMultipart(url: string, files: MultipartFormData, options?: Partial<RequestOptions>): Response[]
  function postMultipart(url: string, files: MultipartFormData, options?: Partial<RequestOptions>, callback?: (rs: Response[]) => void): void
  function request(url: string, options?: Partial<RequestOptions>): Response[]
  function request(url: string, options?: Partial<RequestOptions>, callback?: (rs: Response[]) => void): void
}
