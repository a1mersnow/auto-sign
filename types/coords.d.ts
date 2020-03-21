/**
 * ==================== 基于坐标的触摸模拟 ==========================
 * 要获取要点击的位置的坐标，可以在开发者选项中开启"指针位置"
 * 基于坐标的脚本通常会有分辨率的问题，可以通过setScreenMetrics()来进行自动坐标放缩
 * 控件和坐标也可以相互结合
 */

/** 设置脚本坐标点击所适合的屏幕宽高 */
declare function setScreenMetrics(width: number, height: number): void

/** around 150ms */
declare function click(x: number, y: number): boolean

/** around 600ms */
declare function longClick(x: number, y: number): boolean

/**
 * 按住一段时间，超过500ms认为是长按
 * @param x
 * @param y
 * @param duration ms
 */
declare function press(x: number, y: number, duration: number): boolean

/**
 * 模拟滑动
 * @param x1 滑动起始x
 * @param y1 滑动起始y
 * @param x2 滑动结束x
 * @param y2 滑动结束y
 * @param duration 滑动时长ms
 */
declare function swipe(x1: number, y1: number, x2: number, y2: number, duration: number): boolean

/**
 *
 * @param duration 每两点间隔时长
 * @param points
 */
declare function gesture(duration: number, ...points: [number, number][]): boolean

type Gesture = [number, number, ...[number, number][]]
declare function gestures(...gs: Gesture[]): boolean
