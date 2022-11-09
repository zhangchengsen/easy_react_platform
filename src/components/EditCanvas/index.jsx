import React from "react";
import InputColor from "@/lib/InputColor";
import { useCanvasByContext } from "../../store/hooks";
import styles from "./index.less";
import Item from "../../lib/Item";

function EditCanvas() {
  const canvas = useCanvasByContext();
  const style = canvas.getCanvas().style;
  const handleStyleChange = (e, name, isText) => {
    let value =
      name === "backgroundColor"
        ? e.hex
        : isText
        ? e.target.value
        : e.target.value - 0;
    console.log(value);
    canvas.updateCanvasStyle({ [name]: value });
  };
  return (
    <div className={styles.main}>
      <div className={styles.title}>画布属性</div>
      <Item label="画布宽度 (px):">
        <input
          type="number"
          className={styles.itemRight}
          value={style.width}
          onChange={(e) => handleStyleChange(e, "width")}
        ></input>
      </Item>
      <Item label="画布高度 (px):">
        <input
          type="number"
          className={styles.itemRight}
          value={style.height}
          onChange={(e) => handleStyleChange(e, "height")}
        ></input>
      </Item>
      <Item label="背景颜色:">
        <InputColor
          className={styles.itemRight}
          color={style.backgroundColor}
          onChangeComplete={(e) => handleStyleChange(e, "backgroundColor")}
        ></InputColor>
      </Item>
      <Item label="背景图片:">
        <input
          className={styles.itemRight}
          value={style.backgroundImage}
          onChange={(e) => handleStyleChange(e, "backgroundImage", true)}
        ></input>
      </Item>
      <Item label="背景图片位置:">
        <input
          className={styles.itemRight}
          value={style.backgroundPosition}
          onChange={(e) => handleStyleChange(e, "backgroundPosition", true)}
        ></input>
      </Item>
      <Item label="背景图片尺寸:">
        <input
          className={styles.itemRight}
          value={style.backgroundSize}
          onChange={(e) => handleStyleChange(e, "backgroundSize", true)}
        ></input>
      </Item>
    </div>
  );
}

export default EditCanvas;
