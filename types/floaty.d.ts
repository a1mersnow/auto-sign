interface FloatyWindowBase {
  [id: string]: any
  setPosition(x: number, y: number): void
  getX(): number
  getY(): number
  setSize(width: number, height: number): void
  getWidth(): number
  getHeight(): number
  close(): void
  exitOnClose(): void
}
interface FloatyWindow extends FloatyWindowBase {
  setAdjustEnabled(enabled: boolean): void
}
interface FloatyRawWindow extends FloatyWindowBase {
  setTouchable(touchable: boolean): void
}
declare namespace floaty {
  function window(layout: Xml | View): FloatyWindow
  function rawWindow(layout: Xml | View): FloatyRawWindow
  function closeAll(): void
}
