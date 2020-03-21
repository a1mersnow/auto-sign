declare namespace canvas {
  function drawLine(x: number, y: number, dx: number, dy: number, paint: Paint): void
  function drawRect(x: number, y: number, dx: number, dy: number, paint: Paint): void
  function draw(...args: any[]): any
  function drawARGB(...args: any[]): any
}

type PaintStyle = unknown

declare class Paint {
  static STYLE: {
    FILL: PaintStyle
  }
  setStyle(s: PaintStyle): void
  setColor(color: string | number): void
}
