type InterpolationMethod = 'NEAREST' | 'LINEAR' | 'AREA' | 'CUBIC' | 'LANCZOS4'

interface Image {
  getWidth(): number
  getHeight(): number
  saveTo(path: string): void
  pixel(x: number, y: number): number
  recycle(): void
}

type ThresholdTypes = 'BINARY' | 'BINARY_INV' | 'TRUNC' | 'TOZERO' | 'TOZERO_INV' | 'OTSU' | 'TRIANGLE'

declare enum ColorConversionCodes {
  BGR2BGRA = 0,
  RGB2RGBA = BGR2BGRA,
  BGRA2BGR = 1,
  RGBA2RGB = BGRA2BGR,
  BGR2RGBA = 2,
  RGB2BGRA = BGR2RGBA,
  RGBA2BGR = 3,
  BGRA2RGB = RGBA2BGR,
  BGR2RGB = 4,
  RGB2BGR = BGR2RGB,
  BGRA2RGBA = 5,
  RGBA2BGRA = BGRA2RGBA,
  BGR2GRAY = 6,
  RGB2GRAY = 7,
  GRAY2BGR = 8,
  GRAY2RGB = GRAY2BGR,
  GRAY2BGRA = 9,
  GRAY2RGBA = GRAY2BGRA,
  BGRA2GRAY = 10,
  RGBA2GRAY = 11,
  BGR2BGR565 = 12,
  RGB2BGR565 = 13,
  BGR5652BGR = 14,
  BGR5652RGB = 15,
  BGRA2BGR565 = 16,
  RGBA2BGR565 = 17,
  BGR5652BGRA = 18,
  BGR5652RGBA = 19,
  GRAY2BGR565 = 20,
  BGR5652GRAY = 21,
  BGR2BGR555 = 22,
  RGB2BGR555 = 23,
  BGR5552BGR = 24,
  BGR5552RGB = 25,
  BGRA2BGR555 = 26,
  RGBA2BGR555 = 27,
  BGR5552BGRA = 28,
  BGR5552RGBA = 29,
  GRAY2BGR555 = 30,
  BGR5552GRAY = 31,
  BGR2XYZ = 32,
  RGB2XYZ = 33,
  XYZ2BGR = 34,
  XYZ2RGB = 35,
  BGR2YCrCb = 36,
  RGB2YCrCb = 37,
  YCrCb2BGR = 38,
  YCrCb2RGB = 39,
  BGR2HSV = 40,
  RGB2HSV = 41,
  BGR2Lab = 44,
  RGB2Lab = 45,
  BGR2Luv = 50,
  RGB2Luv = 51,
  BGR2HLS = 52,
  RGB2HLS = 53,
  HSV2BGR = 54,
  HSV2RGB = 55,
  Lab2BGR = 56,
  Lab2RGB = 57,
  Luv2BGR = 58,
  Luv2RGB = 59,
  HLS2BGR = 60,
  HLS2RGB = 61,
  BGR2HSV_FULL = 66,
  RGB2HSV_FULL = 67,
  BGR2HLS_FULL = 68,
  RGB2HLS_FULL = 69,
  HSV2BGR_FULL = 70,
  HSV2RGB_FULL = 71,
  HLS2BGR_FULL = 72,
  HLS2RGB_FULL = 73,
  LBGR2Lab = 74,
  LRGB2Lab = 75,
  LBGR2Luv = 76,
  LRGB2Luv = 77,
  Lab2LBGR = 78,
  Lab2LRGB = 79,
  Luv2LBGR = 80,
  Luv2LRGB = 81,
  BGR2YUV = 82,
  RGB2YUV = 83,
  YUV2BGR = 84,
  YUV2RGB = 85,
  YUV2RGB_NV12 = 90,
  YUV2BGR_NV12 = 91,
  YUV2RGB_NV21 = 92,
  YUV2BGR_NV21 = 93,
  YUV420sp2RGB = YUV2RGB_NV21,
  YUV420sp2BGR = YUV2BGR_NV21,
  YUV2RGBA_NV12 = 94,
  YUV2BGRA_NV12 = 95,
  YUV2RGBA_NV21 = 96,
  YUV2BGRA_NV21 = 97,
  YUV420sp2RGBA = YUV2RGBA_NV21,
  YUV420sp2BGRA = YUV2BGRA_NV21,
  YUV2RGB_YV12 = 98,
  YUV2BGR_YV12 = 99,
  YUV2RGB_IYUV = 100,
  YUV2BGR_IYUV = 101,
  YUV2RGB_I420 = YUV2RGB_IYUV,
  YUV2BGR_I420 = YUV2BGR_IYUV,
  YUV420p2RGB = YUV2RGB_YV12,
  YUV420p2BGR = YUV2BGR_YV12,
  YUV2RGBA_YV12 = 102,
  YUV2BGRA_YV12 = 103,
  YUV2RGBA_IYUV = 104,
  YUV2BGRA_IYUV = 105,
  YUV2RGBA_I420 = YUV2RGBA_IYUV,
  YUV2BGRA_I420 = YUV2BGRA_IYUV,
  YUV420p2RGBA = YUV2RGBA_YV12,
  YUV420p2BGRA = YUV2BGRA_YV12,
  YUV2GRAY_420 = 106,
  YUV2GRAY_NV21 = YUV2GRAY_420,
  YUV2GRAY_NV12 = YUV2GRAY_420,
  YUV2GRAY_YV12 = YUV2GRAY_420,
  YUV2GRAY_IYUV = YUV2GRAY_420,
  YUV2GRAY_I420 = YUV2GRAY_420,
  YUV420sp2GRAY = YUV2GRAY_420,
  YUV420p2GRAY = YUV2GRAY_420,
  YUV2RGB_UYVY = 107,
  YUV2BGR_UYVY = 108,
  YUV2RGB_Y422 = YUV2RGB_UYVY,
  YUV2BGR_Y422 = YUV2BGR_UYVY,
  YUV2RGB_UYNV = YUV2RGB_UYVY,
  YUV2BGR_UYNV = YUV2BGR_UYVY,
  YUV2RGBA_UYVY = 111,
  YUV2BGRA_UYVY = 112,
  YUV2RGBA_Y422 = YUV2RGBA_UYVY,
  YUV2BGRA_Y422 = YUV2BGRA_UYVY,
  YUV2RGBA_UYNV = YUV2RGBA_UYVY,
  YUV2BGRA_UYNV = YUV2BGRA_UYVY,
  YUV2RGB_YUY2 = 115,
  YUV2BGR_YUY2 = 116,
  YUV2RGB_YVYU = 117,
  YUV2BGR_YVYU = 118,
  YUV2RGB_YUYV = YUV2RGB_YUY2,
  YUV2BGR_YUYV = YUV2BGR_YUY2,
  YUV2RGB_YUNV = YUV2RGB_YUY2,
  YUV2BGR_YUNV = YUV2BGR_YUY2,
  YUV2RGBA_YUY2 = 119,
  YUV2BGRA_YUY2 = 120,
  YUV2RGBA_YVYU = 121,
  YUV2BGRA_YVYU = 122,
  YUV2RGBA_YUYV = YUV2RGBA_YUY2,
  YUV2BGRA_YUYV = YUV2BGRA_YUY2,
  YUV2RGBA_YUNV = YUV2RGBA_YUY2,
  YUV2BGRA_YUNV = YUV2BGRA_YUY2,
  YUV2GRAY_UYVY = 123,
  YUV2GRAY_YUY2 = 124,
  YUV2GRAY_Y422 = YUV2GRAY_UYVY,
  YUV2GRAY_UYNV = YUV2GRAY_UYVY,
  YUV2GRAY_YVYU = YUV2GRAY_YUY2,
  YUV2GRAY_YUYV = YUV2GRAY_YUY2,
  YUV2GRAY_YUNV = YUV2GRAY_YUY2,
  RGBA2mRGBA = 125,
  mRGBA2RGBA = 126,
  RGB2YUV_I420 = 127,
  BGR2YUV_I420 = 128,
  RGB2YUV_IYUV = RGB2YUV_I420,
  BGR2YUV_IYUV = BGR2YUV_I420,
  RGBA2YUV_I420 = 129,
  BGRA2YUV_I420 = 130,
  RGBA2YUV_IYUV = RGBA2YUV_I420,
  BGRA2YUV_IYUV = BGRA2YUV_I420,
  RGB2YUV_YV12 = 131,
  BGR2YUV_YV12 = 132,
  RGBA2YUV_YV12 = 133,
  BGRA2YUV_YV12 = 134,
  BayerBG2BGR = 46,
  BayerGB2BGR = 47,
  BayerRG2BGR = 48,
  BayerGR2BGR = 49,
  BayerBG2RGB = BayerRG2BGR,
  BayerGB2RGB = BayerGR2BGR,
  BayerRG2RGB = BayerBG2BGR,
  BayerGR2RGB = BayerGB2BGR,
  BayerBG2GRAY = 86,
  BayerGB2GRAY = 87,
  BayerRG2GRAY = 88,
  BayerGR2GRAY = 89,
  BayerBG2BGR_VNG = 62,
  BayerGB2BGR_VNG = 63,
  BayerRG2BGR_VNG = 64,
  BayerGR2BGR_VNG = 65,
  BayerBG2RGB_VNG = BayerRG2BGR_VNG,
  BayerGB2RGB_VNG = BayerGR2BGR_VNG,
  BayerRG2RGB_VNG = BayerBG2BGR_VNG,
  BayerGR2RGB_VNG = BayerGB2BGR_VNG,
  BayerBG2BGR_EA = 135,
  BayerGB2BGR_EA = 136,
  BayerRG2BGR_EA = 137,
  BayerGR2BGR_EA = 138,
  BayerBG2RGB_EA = BayerRG2BGR_EA,
  BayerGB2RGB_EA = BayerGR2BGR_EA,
  BayerRG2RGB_EA = BayerBG2BGR_EA,
  BayerGR2RGB_EA = BayerGB2BGR_EA,
  BayerBG2BGRA = 139,
  BayerGB2BGRA = 140,
  BayerRG2BGRA = 141,
  BayerGR2BGRA = 142,
  BayerBG2RGBA = BayerRG2BGRA,
  BayerGB2RGBA = BayerGR2BGRA,
  BayerRG2RGBA = BayerBG2BGRA,
  BayerGR2RGBA = BayerGB2BGRA,
  COLORCVT_MAX = 143
}

type Mat = unknown

interface Point {
  x: number
  y: number
}

type FindRegion = [number, number] | [number, number, number, number]

type ImplyEdgeType = 'CONSTANT' | 'REPLICATE' | 'REFLECT' | 'WRAP' | 'REFRECT_101' | 'TRANSPARENT' | 'REFLECT101' | 'DEFAULT' | 'ISOLATED'

interface FindColorOptions {
  region?: FindRegion,
  /** 默认 4 */
  threshold?: number
}

interface FindImageOptions extends FindColorOptions {
  level?: number
}

interface MatchTemplateOptions extends FindImageOptions {
  /** 找图结果最大数量 默认 5 */
  max?: number
}

type MatchingResultSortor = 'left' | 'top' | 'right' | 'bottom' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | ((a: Match, b: Match) => 1 | 0)

interface MatchingResult {
  matches: Match[]
  points: Point[]
  first(): Match | null
  last(): Match | null
  leftmost(): Match | null
  rightmost(): Match | null
  topmost(): Match | null
  bottommost(): Match | null
  best(): Match | null
  worst(): Match | null
  sortBy(cmp: MatchingResultSortor): MatchingResult
}

interface Match {
  point: Point
  similarity: number
}

type ColorMatchingAlgorithm = 'diff' | 'equal' | 'rgb' | 'rgb+' | 'hs'

declare namespace images {
  function read(path: string): Image | null
  function load(url: string): Image | null
  function copy(img: Image): Image
  function save(image: Image, path: string, format?: string, quality?: number): void
  function fromBase64(base64: string): Image | null
  function toBase64(img: Image, format?: string, quality?: number): string
  function fromBytes(bytes: number[]): Image | null
  function toBytes(img: Image, format?: string, quality?: number): number[]
  function clip(img: Image, x: number, y: number, w: number, h: number): Image
  function resize(img: Image, size: [number, number] | number, interpolation?: InterpolationMethod): Image
  function scale(img: Image, fx: number, fy: number, interpolation?: InterpolationMethod): Image
  function rotate(img: Image, degress: number, x?: number, y?: number): Image
  function concat(img1: Image, img2: Image, direction?: 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'): Image
  function grayscale(img: Image): Image
  function threshold(img: Image, threshold: number, maxVal: number, type?: ThresholdTypes): Image
  function adaptiveThreshold(img: Image, maxValue: number, adaptiveMethod: 'MEAN_C' | 'GAUSSIAN_C', thresholdType: 'BINARY' | 'BINARY_INV', blockSize: number, C: number): Image
  function cvtColor(img: Image, code: ColorConversionCodes, dstCn?: number): Image
  /** 二值化 范围外 -> 0 范围内 -> 255 */
  function inRange(img: Image, lowerBound: number | string, upperBound: number | string): Image
  /** 二值化 [color - interval, color + interval] 范围外 -> 0 范围内 -> 255 */
  function interval(img: Image, color: string | number, interval: number): Image
  function blur(img: Image, size: [number, number], anchor?: number[], type?: ImplyEdgeType): Image
  function medianBlur(img: Image, size: [number, number]): Image
  function gaussianBlur(img: Image, size: [number, number], sigmaX?: number, sigmaY?: number, type?: ImplyEdgeType): Image
  function matToImage(mat: Mat): Image
  /** 申请截图权限 */
  function requestScreenCapture(landscape?: boolean): boolean
  function captureScreen(): Image
  function captureScreen(path: string): void
  /** 原点为左上角 */
  function pixel(image: Image, x: number, y: number): number
  function findColor(image: Image, color: number | string, options?: FindColorOptions): Point | null
  function findColorInRegion(img: Image, color: number | string, x: number, y: number, width?: number, height?: number, threshold?: number): Point | null
  function findColorEquals(img: Image, color: number | string, x?: number, y?: number, width?: number, height?: number): Point | null
  function findMultiColors(img: Image, firstColor: number | string, colors: [number, number, number | string][], options?: FindColorOptions): Point | null
  function detectsColor(image: Image, color: number | string, x: number, y: number, threshold?: number, algorithm?: ColorMatchingAlgorithm): boolean
  function findImage(img: Image, template: Image, options?: FindImageOptions): Point | null
  function findImageInRegion(img: Image, template: Image, x: number, y: number, width?: number, height?: number, threshold?: number): Point | null
  function matchTemplate(img: Image, template: Image, options: MatchTemplateOptions): MatchingResult
}

declare const captureScreen: typeof images.captureScreen
declare const findColor: typeof images.findColor
declare const findColorInRegion: typeof images.findColorInRegion
declare const findColorEquals: typeof images.findColorEquals
declare const findImage: typeof images.findImage
declare const findImageInRegion: typeof images.findImageInRegion
