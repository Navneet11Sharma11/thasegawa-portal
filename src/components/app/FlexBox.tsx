import { CSSProperties, FC } from "react";

type TFlex = {
  center?: boolean;
  column?: boolean;

  gap?: CSSProperties["gap"];
  flex?: CSSProperties["flex"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  flexDirection?: CSSProperties["flexDirection"];

  flexGrow?: CSSProperties["flexGrow"];
  flexBasis?: CSSProperties["flexBasis"];
  flexShrink?: CSSProperties["flexShrink"];
  flexWrap?: CSSProperties["flexWrap"];

  margin?: CSSProperties["margin"];
  padding?: CSSProperties["padding"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  maxWidth?: CSSProperties["maxWidth"];
} & DivElementType;

const FlexBox: FC<TFlex> = ({
  center,
  column = false,
  children,
  style,
  //css
  gap = "2px",
  flex,
  alignItems,
  justifyContent,
  flexDirection,
  flexGrow,
  flexBasis,
  flexShrink,
  flexWrap,
  margin,
  padding,
  width,
  height,
  maxWidth,
  ...props
}) => {
  const flexStyle = {
    flex,
    alignItems,
    justifyContent,
    flexGrow,
    flexBasis,
    flexShrink,
    flexWrap,
    margin,
    padding,
    width,
    height,
    maxWidth,
  };

  const commonStyle: CSSProperties = {
    display: "flex",
    gap: gap,
    flexDirection: column ? "column" : flexDirection,
    ...flexStyle,
    ...style,
  };

  const _style: CSSProperties = center
    ? {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        ...commonStyle,
      }
    : commonStyle;

  return (
    <div style={_style} {...props}>
      {children}
    </div>
  );
};

export default FlexBox;
