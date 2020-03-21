type Gravity = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'center_vertical' | 'center_horizontal' | 'left|top' | 'left|bottom' | 'left|center_vertical' | 'right|top' | 'right|bottom' | 'right|center_vertical' | 'center_horizontal|top' | 'center_horizontal|bottom' | 'center_horizontal|center_vertical'

interface TextControlAttr {
  text: string,
  textColor: string
  textSize: string
  textStyle: 'bold' | 'italic' | 'normal' | 'bold|italic',
  lines: string
  maxLines: string
  typeface: 'normal' | 'sans' | 'serif' | 'monospace'
  ellipsize: 'end' | 'marquee' | 'middle' | 'none' | 'start'
  ems: string
  autoLink: 'none' | 'all' | 'email' | 'email|map' | 'email|map|phone' | 'email|map|phone|web' | 'email|map|web' | 'email|phone' | 'email|phone|web' | 'email|web' | 'map' | 'map|phone' | 'map|phone|web' | 'map|web' | 'phone' | 'phone|web' | 'web',
}

interface ButtonControlAttr extends TextControlAttr {}
interface InputControlAttr extends TextControlAttr {
  hint: string
  textColorHint: string
  textSizeHint: string
  inputType: 'date' | 'datetime' | 'none' | 'number' | 'numberDecimal' | 'numberPassword' | 'numberSigned' | 'phone' | 'text' | 'textAutoComplete' | 'textAutoCorrect' | 'textCapCharacters' | 'textCapSentences' | 'textCapWords' | 'textEmailAddress' | 'textEmailSubject' | 'textImeMultiLine' | 'textLongMessage' | 'textMultiLine' | 'textNoSuggestions' | 'textPassword' | 'textPersonName' | 'textPhonetic' | 'textPostalAddress' | 'textShortMessage' | 'textUri' | 'textVisiblePassword' | 'textWebEditText' | 'textWebEmailAddress' | 'textWebPassword' | 'time',
  password: 'true' | 'false'
  numeric: 'true' | 'false'
  phoneNumber: 'true' | 'false'
  digits: string
  singleLine: 'true' | 'false'
}
interface ImageControlAttr {
  src: string
  tint: string
  scaleType: 'center' | 'centerCrop' | 'centerInside' | 'fitCenter' | 'fitEnd' | 'fitStart' | 'fitXY' | 'matrix'
  radius: string
  radiusTopLeft: string
  radiusTopRight: string
  radiusBottomLeft: string
  radiusBottomRight: string
  borderWidth: string
  borderColor: string
  circle: 'true' | 'false'
}

declare namespace JSX {
  type IntrinsicElements = {
    [x: string]: Partial<{
      /** '*' | 'auto' | number */
      w: string
      /** '*' | 'auto' | number */
      h: string
      id: string
      gravity: Gravity
      layout_gravity: Gravity
      margin: string
      marginLeft: string
      marginRight: string
      marginTop: string
      marginBottom: string
      padding: string
      paddingLeft: string
      paddingRight: string
      paddingTop: string
      paddingBottom: string
      bg: string
      /** 0-1 */
      alpha: string
      foreground: string
      minHeight: string
      minWidth: string
      visbility: 'gone' | 'visible' | 'invisible'
      rotation: string
      transformPivotX: string
      transformPivotY: string
      style: string,
      layout_weight: string
    }>
  } & {
    text: Partial<TextControlAttr>
    button: Partial<ButtonControlAttr>
    input: Partial<InputControlAttr>
    img: Partial<ImageControlAttr>
  }
  interface Element {}
}
type Xml = JSX.Element
interface View {
  getText(): string
}

declare const ui: {
  [id: string]: View
} & {
  layout(l: Xml): void
  findView(id: string): View
  run(callback: () => void): void
}
