import styles from "./index.less";
import classNames from "classnames";

import React, { Component } from "react";
import { CanvasContext } from "../../Context";
import { isImgComponent, isTextComponent } from "../../layout/Left";
import Text from "../Text";
import Img from "../Img";

export default class index extends Component {
  static contextType = CanvasContext;
  dragStart = (e) => {
    this.setSelected(e);
    const startX = e.pageX - 0;
    const startY = e.pageY - 0;
    e.dataTransfer.setData("text", startX + "," + startY);
  };
  setSelected = (e) => {
    e.stopPropagation();
    this.context.setSelectedCmpIndex(this.props.index);
  };
  rotate = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { style } = this.props.cmp;
    const { width, height, transform } = style;
    const trans = parseFloat(transform);
    const r = height / 2;
    const ang = ((trans + 90) * Math.PI) / 180;
    const [offsetX, offsetY] = [-Math.cos(ang) * r, -Math.sin(ang) * r];
    const startX = e.pageX + offsetX;
    const startY = e.pageY + offsetY;
    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;
      let disX = x - startX;
      let disY = y - startY;
      let deg = 360 * Math.atan2(disY, disX);
      deg = deg.toFixed(2);
      this.context.updateSelectedCmp({
        transform: deg,
      });
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  // useEffect(() => {

  //   document.getElementById("center").onkeydown = whickKeyEvent()

  // }, [])
  // whickKeyEvent = (e) => {

  // }
  onMouseDown = (e) => {
    const direction = e.target.dataset.direction;
    console.log("direction", direction, "dataset", e.target.dataset);

    if (!direction) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    let startX = e.pageX - 0;
    let startY = e.pageY - 0;
    const { cmp } = this.props;
    const move = (e) => {
      let x = e.pageX;
      let y = e.pageY;
      let disX = x - startX;
      let disY = y - startY;
      let newStyle = {};
      // top left
      if (direction) {
        if (direction.indexOf("top") >= 0) {
          disY = 0 - disY;
          newStyle.top = cmp.style.top - disY;
        }
        if (direction.indexOf("left") >= 0) {
          disX = 0 - disX;
          newStyle.left = cmp.style.left - disX;
        }
      }

      const newHeight = cmp.style.height + disY;

      Object.assign(newStyle, {
        width: cmp.style.width + disX,
        height: newHeight,
      });
      if (cmp.style.fontSize) {
        //文本
        const n = newHeight / cmp.style.height;
        let newFontSize = n * cmp.style.fontSize;
        newFontSize =
          newFontSize < 12 ? 12 : newFontSize > 130 ? 130 : newFontSize;
        Object.assign(newStyle, {
          lineHeight: newHeight + "px",
          fontSize: newFontSize,
        });
      }
      this.context.updateSelectedCmp(newStyle);
      startX = x;
      startY = y;
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  render() {
    const { cmp, selected } = this.props;
    const { style, value } = cmp;
    console.log("cmp", cmp);
    const { width, height } = style;
    const transform = `rotate(${style.transform}deg)`;
    return (
      <div
        className={styles.main}
        draggable="true"
        onDragStart={this.dragStart}
        onClick={this.setSelected}
      >
        {/* 组件本身 */}
        <div className={styles.cmp} style={{ ...style, transform }}>
          {getComponent(cmp)}
        </div>
        {/* 组件功能 选中 右键等 */}
        <ul
          className={classNames(
            styles.editStyle,
            selected ? styles.selected : styles.unselected
          )}
          style={{
            top: style.top - 2,
            left: style.left - 2,
            width: style.width,
            height: style.height,
          }}
          onMouseDown={this.onMouseDown}
        >
          <li
            className={styles.stretchDot}
            style={{ top: -8, left: -8 }}
            data-direction="top, left"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: -8,
              left: width / 2 - 8,
            }}
            data-direction="top"
          />

          <li
            className={styles.stretchDot}
            style={{ top: -8, left: width - 8 }}
            data-direction="top right"
          />

          <li
            className={styles.stretchDot}
            style={{ top: height / 2 - 8, left: width - 8 }}
            data-direction="right"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: width - 8,
            }}
            data-direction="bottom right"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: width / 2 - 8,
            }}
            data-direction="bottom"
          />

          <li
            className={styles.stretchDot}
            style={{
              top: height - 8,
              left: -8,
            }}
            data-direction="bottom left"
          />
          <li
            className={styles.stretchDot}
            style={{
              top: height / 2 - 8,
              left: -8,
            }}
            data-direction="left"
          />

          <li
            className={classNames(styles.rotate, "iconfont icon-rotate-fill")}
            style={{
              top: height + 8,
              left: width / 2 - 8,
            }}
            onMouseDown={(e) => this.rotate(e)}
          />
        </ul>
      </div>
    );
  }
}
function getComponent(cmp) {
  switch (cmp.type) {
    case isTextComponent:
      return <Text {...cmp}></Text>;
    case isImgComponent:
      return <Img {...cmp}></Img>;
    default:
      break;
  }
}
