import {
  Shape,
  Path,
  signal,
  initial,
  computed,
  ShapeProps,
} from "@motion-canvas/2d";
import { SignalValue, SimpleSignal } from "@motion-canvas/core";

export interface Props extends ShapeProps {
  rx?: SignalValue<number>;
  ry?: SignalValue<number>;
}

export class Squircle extends Shape {
  @initial(0)
  @signal()
  public declare readonly rx: SimpleSignal<number, this>;

  @initial(0)
  @signal()
  public declare readonly ry: SimpleSignal<number, this>;

  @computed()
  public getDataString(): string {
    const width = this.width();
    const height = this.height();
    const EPSILON = 0.00001;
    const rx = Math.max(EPSILON, Math.min(this.rx(), width / 2));
    const ry = Math.max(EPSILON, Math.min(this.ry(), height / 2));

    const HALF_WIDTH = width / 2;
    const HALF_HEIGHT = height / 2;

    const SEG_H = HALF_WIDTH - rx;
    const SEG_V = HALF_HEIGHT - ry;

    // A = (rx ry angle large-arc-flag sweep-flag x y)+
    // a = (rx ry angle large-arc-flag sweep-flag dx dy)+

    const bruh = [
      `M ${-HALF_WIDTH} 0`,
      // top left
      `l 0 ${-SEG_V}`,
      `a ${rx} ${ry} 0 0 1 ${rx} ${-ry}`,
      `l ${SEG_H} 0`,
      // top right
      `l ${SEG_H} 0`,
      `a ${rx} ${ry} 0 0 1 ${rx} ${ry}`,
      `l 0 ${SEG_V}`,
      // bottom right
      `l 0 ${SEG_V}`,
      `a ${rx} ${ry} 0 0 1 ${-rx} ${ry}`,
      `l ${-SEG_H} 0`,
      // bottom left
      `l ${-SEG_H} 0`,
      `a ${rx} ${ry} 0 0 1 ${-rx} ${-ry}`,
      `l 0 ${-SEG_V}`,
      // return
      `z`,
    ].join("");
    return bruh;
  }

  constructor({ ...props }: Props) {
    super(props);

    this.add(<Path {...props} data={this.getDataString}></Path>);
  }
}
