import {
  initial,
  Layout,
  Line,
  Node,
  NodeProps,
  Rect,
  Shape,
  ShapeProps,
  signal,
  Txt,
} from "@motion-canvas/2d";
import {
  createRef,
  createSignal,
  SignalValue,
  SimpleSignal,
} from "@motion-canvas/core";

export interface SliderProps extends ShapeProps {
  label: string;
  valueFunction: (fraction: number) => any;
  fraction?: SignalValue<number>;
}

export class Slider extends Shape {
  @initial(0.5)
  @signal()
  public declare readonly fraction: SimpleSignal<number, this>;

  constructor(props?: SliderProps) {
    super({ ...props });

    this.minWidth(400);

    const TRACK_HEIGHT = 40;

    const fractionWidth = createSignal(() => this.fraction() * this.width());

    const textPartRef = createRef<Layout>();

    this.add(
      <Layout>
        <Layout
          ref={textPartRef}
          layout
          direction={"row"}
          justifyContent={"space-between"}
          x={() => this.width() / 2}
          width={this.width}
        >
          <Txt text={props.label} fill={"gray"} fontWeight={900} />
          <Txt
            text={() =>
              new String(props.valueFunction(this.fraction())).toString()
            }
            fill={"white"}
            fontWeight={900}
          />
        </Layout>
        <Layout topLeft={() => textPartRef().bottomLeft()}>
          <Line
            points={() => [
              [0, TRACK_HEIGHT / 2],
              [this.width(), TRACK_HEIGHT / 2],
            ]}
            stroke={this.stroke}
            lineWidth={6}
          ></Line>
          {/* Progress line */}
          <Line
            points={() => [
              [0, TRACK_HEIGHT / 2],
              [fractionWidth(), TRACK_HEIGHT / 2],
            ]}
            stroke={this.fill}
            lineWidth={6}
          ></Line>
          {/* Track playhead */}
          <Rect
            x={fractionWidth}
            y={() => TRACK_HEIGHT / 2}
            fill={this.fill}
            width={6}
            height={TRACK_HEIGHT}
          />
        </Layout>
      </Layout>,
    );
  }
}
