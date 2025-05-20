// we make this file to solve error we getting when we use react-split-pane

declare module "react-split-pane" {
  import * as React from "react";

  interface SplitPaneProps {
    split?: "vertical" | "horizontal";
    minSize?: number;
    maxSize?: number;
    defaultSize?: number | string;
    size?: number | string;
    allowResize?: boolean;
    primary?: "first" | "second";
    className?: string;
    style?: React.CSSProperties;
    paneStyle?: React.CSSProperties;
    pane1Style?: React.CSSProperties;
    pane2Style?: React.CSSProperties;
    resizerStyle?: React.CSSProperties;
    children?: React.ReactNode;  // Fix: Add children here!
  }

  export default class SplitPane extends React.Component<SplitPaneProps> {}
}
