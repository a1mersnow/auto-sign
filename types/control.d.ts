interface Auto {
  (mode?: 'fast' | 'normal'): void
  waitFor(): void
  setMode(mode: 'fast' | 'normal'): void
}

declare const auto: Auto

// SimpleActionAutomator
declare function click(text: string, i?: number): boolean
declare function click(left: number, top: number, bottom: number, right: number): boolean
declare function longClick(text: string, i?: number): boolean
declare function scrollUp(i?: number): boolean
declare function scrollDown(i?: number): boolean
declare function setText(text: string): boolean
declare function setText(i: number, text: string): boolean
declare function input(text: string): boolean
declare function input(i: number, text: string): boolean

// UiSelector
declare function text(str: string): UiSelector
declare function textContains(str: string): UiSelector
declare function textStartsWith(prefix: string): UiSelector
declare function textEndsWith(suffix: string): UiSelector
declare function textMatches(reg: string | RegExp): UiSelector
declare function desc(str: string): UiSelector
declare function descContains(str: string): UiSelector
declare function descStartsWith(prefix: string): UiSelector
declare function descEndsWith(suffix: string): UiSelector
declare function descMatches(reg: string | RegExp): UiSelector
declare function id(resId: string): UiSelector
declare function idContains(str: string): UiSelector
declare function idStartsWith(prefix: string): UiSelector
declare function idEndsWith(suffix: string): UiSelector
declare function idMatches(reg: string | RegExp): UiSelector
declare function className(str: string): UiSelector
declare function classNameContains(str: string): UiSelector
declare function classNameStartsWith(prefix: string): UiSelector
declare function classNameEndsWith(suffix: string): UiSelector
declare function classNameMatches(ref: string | RegExp): UiSelector
declare function packageName(str: string): UiSelector
declare function packageNameContains(str: string): UiSelector
declare function packageNameStartsWith(prefix: string): UiSelector
declare function packageNameEndsWith(suffix: string): UiSelector
declare function packageNameMatches(ref: string | RegExp): UiSelector
declare function bounds(left: number, top: number, right: number, bottom: number): UiSelector
declare function boundsInside(left: number, top: number, right: number, bottom: number): UiSelector
declare function boundsContains(left: number, top: number, right: number, bottom: number): UiSelector
declare function drawingOrder(order: number): UiSelector
declare function clickable(b?: boolean): UiSelector
declare function longClickable(b?: boolean): UiSelector
declare function checkable(b?: boolean): UiSelector
declare function selected(b?: boolean): UiSelector
declare function enabled(b?: boolean): UiSelector
declare function scrollable(b?: boolean): UiSelector
declare function editable(b?: boolean): UiSelector
declare function multiLine(b?: boolean): UiSelector


interface UiSelector {
  text(str: string): UiSelector
  textContains(str: string): UiSelector
  textStartsWith(prefix: string): UiSelector
  textEndsWith(suffix: string): UiSelector
  textMatches(reg: string | RegExp): UiSelector
  desc(str: string): UiSelector
  descContains(str: string): UiSelector
  descStartsWith(prefix: string): UiSelector
  descEndsWith(suffix: string): UiSelector
  descMatches(reg: string | RegExp): UiSelector
  /**
   *
   * @param resId 包名:id/ 开头 例：com.tecent.mm:id/send_btn
   */
  id(resId: string): UiSelector
  idContains(str: string): UiSelector
  idStartsWith(prefix: string): UiSelector
  idEndsWith(suffix: string): UiSelector
  idMatches(reg: string | RegExp): UiSelector
  /**
   *
   * @param str android.widget.开头可以省略
   * 常见控件的类名如下：
   * android.widget.TextView 文本控件
   * android.widget.ImageView 图片控件
   * android.widget.Button 按钮控件
   * android.widget.EditText 输入框控件
   * android.widget.AbsListView 列表控件
   * android.widget.LinearLayout 线性布局
   * android.widget.FrameLayout 帧布局
   * android.widget.RelativeLayout 相对布局
   * android.widget.RelativeLayout 相对布局
   * android.support.v7.widget.RecyclerView 通常也是列表控件
   */
  className(str: string): UiSelector
  classNameContains(str: string): UiSelector
  classNameStartsWith(prefix: string): UiSelector
  classNameEndsWith(suffix: string): UiSelector
  classNameMatches(ref: string | RegExp): UiSelector

  packageName(str: string): UiSelector
  packageNameContains(str: string): UiSelector
  packageNameStartsWith(prefix: string): UiSelector
  packageNameEndsWith(suffix: string): UiSelector
  packageNameMatches(ref: string | RegExp): UiSelector

  bounds(left: number, top: number, right: number, bottom: number): UiSelector
  boundsInside(left: number, top: number, right: number, bottom: number): UiSelector
  boundsContains(left: number, top: number, right: number, bottom: number): UiSelector

  drawingOrder(order: number): UiSelector

  clickable(b?: boolean): UiSelector

  longClickable(b?: boolean): UiSelector

  checkable(b?: boolean): UiSelector

  selected(b?: boolean): UiSelector

  enabled(b?: boolean): UiSelector

  scrollable(b?: boolean): UiSelector

  editable(b?: boolean): UiSelector

  multiLine(b?: boolean): UiSelector

  /** 阻塞 DFS */
  findOne(): UiObject
  findOne(timeout?: number): UiObject | null

  findOnce(): UiObject | null
  findOnce(i: number): UiObject | null
  find(): UiCollection
  /** 阻塞 */
  untilFind(): UiCollection
  exists(): boolean
  /** 阻塞 */
  waitFor(): void
  filter(f: (u: UiObject) => boolean): UiCollection
}

/** 控件集合 */
interface UiCollection extends Omit<Array<UiObject>, 'find'> {
  click(): boolean
  longClick(): boolean
  setText(text: string): boolean
  setSelection(start: number, end: number): boolean
  copy(): boolean
  cut(): boolean
  select(): boolean
  paste(): boolean
  scrollForward(): boolean
  scrollBackward(): boolean
  collapse(): boolean
  expand(): boolean
  show(): boolean
  scrollUp(): boolean
  scrollDown(): boolean
  scrollLeft(): boolean
  scrollRight(): boolean

  size(): number
  get(i: number): UiObject
  each(func: (item: UiObject) => void): void
  empty(): boolean
  nonEmpty(): boolean
  find(selector: UiSelector): UiCollection
  findOne(selector: UiSelector): UiObject
}

/** 控件 */
interface UiObject {
  click(): boolean
  longClick(): boolean
  setText(text: string): boolean
  copy(): boolean
  setSelection(start: number, end: number): boolean
  cut(): boolean
  paste(): boolean
  scrollForward(): boolean
  scrollBackward(): boolean
  select(): boolean
  collapse(): boolean
  expand(): boolean
  show(): boolean
  scrollUp(): boolean
  scrollDown(): boolean
  scrollLeft(): boolean
  scrollRight(): boolean
  children(): UiCollection
  childCount(): number
  child(i: number): UiObject | null
  parent(): UiObject | null
  bounds(): Rect
  boundsInParent(): Rect
  drawingOrder(): number
  id(): string | null
  className(): string
  text(): string
  findByText(str: string): UiCollection
  findOne(selector: UiSelector): UiObject | null
  find(selector: UiSelector): UiCollection
}

interface Rect {
  left: number
  right: number
  top: number
  bottom: number
  centerX(): number
  centerY(): number
  width(): number
  height(): number
  /** 包含边界 */
  contains(r: Rect): boolean
  intersect(r: Rect): boolean
}
