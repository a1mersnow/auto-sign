type ColorMatchAlgorithm = 'diff' | 'rgb' | 'rgb+' | 'hs'

declare namespace colors {
  function toString(color: number): string
  function parseColor(color: string): number
  function red(color: number | string): number
  function green(color: number | string): number
  function blue(color: number | string): number
  function alpha(color: number | string): number
  function rgb(red: number, green: number, blue: number): number
  function argb(alpha: number, red: number, green: number, blue: number): number
  /**
   * @param color1
   * @param color2
   * @param threshold 默认 4
   * @param algorithm 默认 'diff'
   */
  function isSimilar(color1: number | string, color2: number | string, threshold?: number, algorithm?: ColorMatchAlgorithm): boolean
  /** 会忽略alpha */
  function equals(color1: number | string, color2: number | string): boolean
  const BLACK: '#FF000000'
  const DKGRAY: '#FF444444'
  const GRAY: '#FF888888'
  const LTGRAY: '#FFCCCCCC'
  const WHITE: '#FFFFFFFF'
  const RED: '#FFFF0000'
  const GREEN: '#FF00FF00'
  const BLUE: '#FF0000FF'
  const YELLOW: '#FFFFFF00'
  const CYAN: '#FF00FFFF'
  const MAGENTA: '#FFFF00FF'
  const TRANSPARENT: '#00000000'
}
